import React, { useState, useEffect } from "react";
import { getChannelStatistics } from "../services/api";

interface DashboardProps {
  videos: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ videos }) => {
  // State for channel statistics
  const [channelStatistics, setChannelStatistics] = useState<any | null>(null);

  useEffect(() => {
    // Effect to fetch channel statistics when videos change
    if (videos.length > 0) {
      const channelId = videos[0]?.snippet?.channelId;

      if (channelId) {
        fetchChannelStatistics(channelId);
      }
    }
  }, [videos]);

  // Function to fetch channel statistics
  const fetchChannelStatistics = async (channelId: string) => {
    try {
      const statistics = await getChannelStatistics(channelId);
      setChannelStatistics(statistics);
    } catch (error) {
      console.error("Error fetching channel statistics:", error);
    }
  };

  return (
    <div>
      {channelStatistics && (
        // Render channel statistics
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
