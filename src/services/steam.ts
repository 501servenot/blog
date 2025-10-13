import axios from "axios";

export interface SteamUserInfo {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
}

export const getPlayerSummaries = async (
  steamids: string
): Promise<SteamUserInfo[]> => {
  if (!steamids) {
    console.warn("getPlayerSummaries called with no steamids.");
    return [];
  }
  try {
    const response = await axios.get<SteamUserInfo[]>(
      "/api/steam/",
      {
        params: {
          steamids: steamids,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching player summaries:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error || "Failed to fetch player summaries"
      );
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
