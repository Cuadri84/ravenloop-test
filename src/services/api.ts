const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const searchChannelsAndVideos = async (
  query: string,
  maxResults: number = 50
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel,video&q=${query}&maxResults=${maxResults}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error en la búsqueda de canales y videos: ${data.error.message}`
      );
    }

    const channels = data.items.filter(
      (item: any) => item.id.kind === "youtube#channel"
    );
    const videos = data.items.filter(
      (item: any) => item.id.kind === "youtube#video"
    );

    // Obtener estadísticas para videos
    const videoIds = videos.map((video: any) => video.id.videoId).join(",");
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
    );

    const statsData = await statsResponse.json();

    if (!statsResponse.ok) {
      throw new Error(
        `Error al obtener estadísticas de video: ${statsData.error.message}`
      );
    }

    // Combinar la información de snippet y statistics para cada video
    const videosWithStats = videos.map((video: any) => {
      const videoId = video.id.videoId;
      const statsInfo = statsData.items.find(
        (stats: any) => stats.id === videoId
      );

      return {
        ...video,
        statistics: statsInfo ? statsInfo.statistics : null,
      };
    });

    return { channels, videos: videosWithStats };
  } catch (error) {
    console.error("Error en la búsqueda de canales y videos:", error);
    throw error;
  }
};
