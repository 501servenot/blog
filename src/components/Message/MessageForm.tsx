"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LoaderCircle } from "lucide-react";

export default function MessageForm() {
  const [content, setContent] = useState("");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);
    const name = username || "匿名";

    console.log("发送消息:", { username: name, content: content.trim() });

    // 发送到数据库
    const { data, error } = await supabase
      .from("messages")
      .insert([{ username: name, content: content.trim() }])
      .select(); // 添加select()来获取插入的数据

    if (error) {
      console.error("发送失败:", error);
      alert("发送失败，请重试");
    } else {
      console.log("发送成功:", data);
      setContent(""); // 只有成功时才清空输入框
    }


    setLoading(false);
  }

  return (
    <div>
      <textarea
        className="w-full px-3 py-2 text-sm border-neutral-600 rounded-lg bg-[#222222] outline-none"
        rows={3}
        placeholder="写下你的留言..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex items-center justify-between text-sm text-gray-300">
        <input
          className="px-3 py-1 rounded-md text-sm border-neutral-600 bg-[#222222] outline-none resize-none"
          value={username}
          placeholder="输入昵称"
          onChange={(e) => setUserName(e.target.value)}
        />

        {loading ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <button
            className="px-2 py-0.5 text-xs bg-neutral-700 border border-neutral-600 rounded-3xl hover:bg-neutral-500 transition-colors"
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
          >
            发送
          </button>
        )}
      </div>
    </div>
  );
}
