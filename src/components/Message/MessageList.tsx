"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, useCallback, memo } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";

type Message = {
  id: string;
  username: string;
  content: string;
  created_at: string;
};

// 单个消息组件，使用memo避免不必要的重新渲染
const MessageItem = memo(({ message }: { message: Message }) => (
  <div className="mt-4">
    <div className="text-[12px] text-neutral-400">
      {message.username || "匿名"}
    </div>
    <div className="text-xs">{message.content}</div>
    <div className="text-[10px] text-neutral-400">
      {new Date(message.created_at).toLocaleString()}
    </div>
  </div>
));

MessageItem.displayName = "MessageItem";

// 连接状态类型
type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

// 连接状态指示器组件
const ConnectionIndicator = memo(
  ({
    status,
    onReconnect,
  }: {
    status: ConnectionStatus;
    onReconnect?: () => void;
  }) => {
    const getStatusConfig = () => {
      switch (status) {
        case "connecting":
          return { color: "bg-yellow-500", text: "连接中...", pulse: true };
        case "connected":
          return { color: "bg-green-500", text: "实时连接", pulse: false };
        case "disconnected":
          return { color: "bg-gray-500", text: "已断开", pulse: false };
        case "error":
          return { color: "bg-red-500", text: "连接错误", pulse: true };
        default:
          return { color: "bg-gray-500", text: "未知状态", pulse: false };
      }
    };

    const config = getStatusConfig();
    const showReconnectButton = status === "error" || status === "disconnected";

    return (
      <div className="flex items-center justify-between mb-4 text-neutral-400">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${config.color} ${
              config.pulse ? "animate-pulse" : ""
            }`}
          />
          <span className="text-[10px]">{config.text}</span>
        </div>

        {showReconnectButton && onReconnect && (
          <button
            onClick={onReconnect}
            className="px-2 py-1 text-[10px] bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
          >
            重新连接
          </button>
        )}
      </div>
    );
  }
);

ConnectionIndicator.displayName = "ConnectionIndicator";

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null);

  // 使用useCallback优化函数，避免不必要的重新创建
  const addNewMessage = useCallback((newMsg: Message) => {
    setMessages((prev) => {
      // 防止重复添加
      const exists = prev.some((m) => m.id === newMsg.id);
      if (exists) {
        return prev;
      }
      // 使用浅拷贝，只在顶部添加新消息
      return [newMsg, ...prev];
    });

    // 更新心跳时间
    setLastHeartbeat(new Date());
  }, []);

  // 重连功能
  const reconnect = useCallback(async () => {
    setConnectionStatus("connecting");

    // 延迟一下再重连，避免过于频繁
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // 简单的ping测试
      const { error } = await supabase.from("messages").select("id").limit(1);

      return !error;
    } catch (err) {
      console.error("❌ 重连测试失败:", err);
      return false;
    }
  }, []);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;
    let retryCount = 0;
    const maxRetries = 3;

    const setupRealtimeAndFetch = async () => {
      try {
        // 获取消息（不依赖连接测试）
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("❌ 获取消息失败:", error);
          // 不要立即设置为错误状态，继续尝试实时连接
        } else if (data) {
          setMessages(data);
        }

        // 设置实时监听
        channel = supabase
          .channel(`messages-channel-${Date.now()}`) // 使用唯一的channel名称
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "messages",
            },
            (payload) => {
              console.log("收到新消息:", payload.new);
              const newMsg = payload.new as Message;
              addNewMessage(newMsg);
            }
          )
          .subscribe((status) => {
            console.log("实时连接状态:", status);

            // 更新连接状态
            switch (status) {
              case "SUBSCRIBED":
                setConnectionStatus("connected");

                retryCount = 0; // 重置重试计数
                break;
              case "CHANNEL_ERROR":
                handleConnectionError();
                break;
              case "TIMED_OUT":
                handleConnectionError();
                break;
              case "CLOSED":
                setConnectionStatus("disconnected");

                break;
              default:
                setConnectionStatus("connecting");
            }
          });
      } catch (err) {
        console.error("❌ 设置连接时发生错误:", err);
        handleConnectionError();
      }
    };

    const handleConnectionError = async () => {
      if (retryCount < maxRetries) {
        retryCount++;
        setConnectionStatus("connecting");

        // 清理旧连接
        if (channel) {
          supabase.removeChannel(channel);
        }

        // 延迟后重试
        setTimeout(() => {
          setupRealtimeAndFetch();
        }, 2000 * retryCount); // 递增延迟
      } else {
        console.error("❌ 达到最大重试次数，连接失败");
        setConnectionStatus("error");
      }
    };

    setupRealtimeAndFetch();

    // 清理函数
    return () => {
      if (channel) {
        console.log("🧹 清理实时连接");
        supabase.removeChannel(channel);
      }
    };
  }, [addNewMessage]);

  // 页面可见性检测和自动重连
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        // 如果连接状态不是已连接，尝试重连
        if (connectionStatus !== "connected") {
          const canReconnect = await reconnect();
          if (canReconnect) {
            // 触发重新设置连接
            window.location.reload();
          }
        }
      } else {
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [connectionStatus, reconnect]);

  // 连接状态监控
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === "connected" && lastHeartbeat) {
        const timeSinceLastHeartbeat = Date.now() - lastHeartbeat.getTime();
        // 如果超过30秒没有收到消息，可能连接有问题
        if (timeSinceLastHeartbeat > 30000) {
        }
      }
    }, 10000); // 每10秒检查一次

    return () => clearInterval(interval);
  }, [connectionStatus, lastHeartbeat]);


  return (
    <div className="mt-4">
      <ConnectionIndicator
        status={connectionStatus}
      />
      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
}
