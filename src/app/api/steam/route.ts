import { NextResponse, NextRequest } from "next/server";

const STEAM_API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;
const STEAM_BASE_URL =
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
  
export async function GET(request: NextRequest) {
    const steamids = request.nextUrl.searchParams.get("steamids");
    const targetUrl = `${STEAM_BASE_URL}?key=${STEAM_API_KEY}&steamids=${steamids}&format=json`;

    try {
        const steamResponse = await fetch(targetUrl, {
            cache: 'no-store',
        });
        if (!steamResponse.ok) {
          // 如果 Steam API 返回错误，将错误信息传递给前端
          const errorText = await steamResponse.text();
          console.error(`Steam API Error: ${errorText}`);
          return NextResponse.json(
            {
              error: "Failed to fetch data from Steam API.",
              details: errorText,
            },
            { status: steamResponse.status }
          );
        }

        const data = await steamResponse.json();
        return NextResponse.json(data.response.players);
    } catch {
        console.error("[STEAM_API_PROXY_ERROR]", Error);
        return NextResponse.json(
          { error: "Internal Server Error." },
          { status: 500 }
        );
    }
}