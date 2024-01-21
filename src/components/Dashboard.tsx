import React, { useState, useEffect } from "react";
import { getChannelStatistics } from "../services/api";

interface DashboardProps {
  videos: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ videos }) => {
  const [channelStatistics, setChannelStatistics] = useState<any | null>(null);

  useEffect(() => {
    if (videos.length > 0) {
      // Obtener el channelId del primer video
      const channelId = videos[0]?.snippet?.channelId;

      if (channelId) {
        // Llamar a la función para obtener las estadísticas del canal
        fetchChannelStatistics(channelId);
      }
    }
  }, [videos]);

  const fetchChannelStatistics = async (channelId: string) => {
    try {
      const statistics = await getChannelStatistics(channelId);
      setChannelStatistics(statistics);
    } catch (error) {
      console.error("Error al obtener estadísticas del canal:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {channelStatistics && (
        <div>
          <p>Visitas totales: {channelStatistics.viewCount}</p>
          <p>Vídeos subidos: {channelStatistics.videoCount}</p>
          {/* Otros datos relevantes del canal */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
