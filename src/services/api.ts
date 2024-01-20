const API_KEY = "AIzaSyAciD-uD4m9A6FaAa5bderD6XImEPxvMAw"; // Reemplaza con tu propia clave de API de YouTube

export const searchChannels = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error en la búsqueda de canales: ${data.error.message}`);
    }

    return data.items;
  } catch (error) {
    console.error("Error en la búsqueda de canales:", error);
    throw error;
  }
};

export const getVideosByChannelId = async (channelId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error al obtener videos del canal: ${data.error.message}`
      );
    }

    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

    // to get the statistics
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
    console.error("Error al obtener videos del canal:", error);
    throw error;
  }
};
