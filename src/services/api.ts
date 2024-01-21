const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Function to search for YouTube channels based on a query
export const searchChannels = async (
  query: string,
  maxResults: number = 50
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&maxResults=${maxResults}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error searching for channels: ${data.error.message}`);
    }

    return data.items;
  } catch (error) {
    console.error("Error searching for channels:", error);
    throw error;
  }
};

// Function to get videos from a YouTube channel based on its ID
export const getVideosByChannelId = async (
  channelId: string,
  maxResults: number = 50
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&maxResults=${maxResults}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching videos from channel: ${data.error.message}`
      );
    }

    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

    // Fetch statistics for the videos
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
    );

    const statsData = await statsResponse.json();

    if (!statsResponse.ok) {
      throw new Error(
        `Error fetching video statistics: ${statsData.error.message}`
      );
    }

    // Combine snippet and statistics information for each video
    const videosWithStats = data.items.map((item: any) => {
      const videoId = item.id.videoId;
      const statsInfo = statsData.items.find(
        (stats: any) => stats.id === videoId
      );

      return {
        ...item,
        statistics: statsInfo ? statsInfo.statistics : null,
      };
    });

    return videosWithStats;
  } catch (error) {
    console.error("Error fetching videos from channel:", error);
    throw error;
  }
};

// Function to get statistics for a YouTube channel based on its ID
export const getChannelStatistics = async (channelId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching channel statistics: ${data.error.message}`
      );
    }

    return data.items[0]?.statistics || null;
  } catch (error) {
    console.error("Error fetching channel statistics:", error);
    throw error;
  }
};
