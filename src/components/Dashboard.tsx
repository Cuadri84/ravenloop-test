import React, { useState, useEffect } from "react";
import { getChannelStatistics } from "../services/api";

interface DashboardProps {
  videos: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ videos }) => {
  const [channelStatistics, setChannelStatistics] = useState<any | null>(null);

  useEffect(() => {
    if (videos.length > 0) {
      const channelId = videos[0]?.snippet?.channelId;

      if (channelId) {
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
      {channelStatistics && (
        <section className="dashboard">
          <div className="dashboard__card">
            <p className="dashboard__card__value">
              {channelStatistics.viewCount}
            </p>
            <p className="dashboard__card__type">Visits</p>
          </div>
          <div className="dashboard__card">
            <p className="dashboard__card__value">
              {channelStatistics.videoCount}
            </p>
            <p className="dashboard__card__type">Videos</p>
          </div>
          <div className="dashboard__card">
            <p className="dashboard__card__value">
              {channelStatistics.subscriberCount}
            </p>
            <p className="dashboard__card__type">Subscribers</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
