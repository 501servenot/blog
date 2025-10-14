import { getPlayerSummaries, SteamUserInfo } from "@/services/steam";
import { useEffect, useState, useRef } from "react";
import StatusShow from "./StatusShow";
import DrawGameConsole from "./GameConsole";
import gsap from "gsap";

interface SteamInfoShowProps {
  pollingInterval?: number;
}

export default function SteamInfoShow({
  pollingInterval = 600000,
}: SteamInfoShowProps) {
  const steamid = "76561199522554321";
  const [userinfo, setuserinfo] = useState<SteamUserInfo>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const fetchUserInfo = async () => {
    try {
      const players = await getPlayerSummaries(steamid);
      setuserinfo(players[0]);
    } catch (err) {
      console.error("Steam API error:", err);
    }
  };

  useEffect(() => {
    fetchUserInfo();

    if (pollingInterval > 0) {
      intervalRef.current = setInterval(fetchUserInfo, pollingInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pollingInterval]);

  useEffect(() => {
    if (!nameRef.current) return;

    gsap.set(nameRef.current, {
      filter: "blur(10px)",
      opacity: 0.3,
    });

    gsap.to(nameRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.5, // 清晰化过程持续2秒
      delay: 5, // 5秒后开始
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="">
      {/* 显示最后更新时间 */}
      {/* <div className="text-xs mt-2">
        最后更新: {new Date().toLocaleTimeString()}
      </div> */}
      <div className="flex justify-center items-center">
        <div className="relative">
          <DrawGameConsole />
          <div className=" flex items-center gap-3 absolute top-5 left-6">
            <div className="flex">
              <div ref={nameRef} className="font-medium text-xs">
                {userinfo?.personaname || "Loading..."}
              </div>
            </div>
          </div>
          <StatusShow state={userinfo?.personastate ?? 0} />
        </div>
      </div>
    </div>
  );
}
