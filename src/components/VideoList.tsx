import React, { useState, useEffect } from "react";
import md5 from "md5";

interface VideoListProps {
  videos: any[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const channelTitle = videos[0]?.snippet.channelTitle;
  const [videoList, setVideoList] = useState(videos);
  const [sortOption, setSortOption] = useState<string>("dateDesc");

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  useEffect(() => {
    let sortedVideos = [...videos];

    switch (sortOption) {
      case "dateDesc":
        sortedVideos = sortedVideos.sort((a, b) => {
          const dateA = new Date(a.snippet.publishedAt);
          const dateB = new Date(b.snippet.publishedAt);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "dateAsc":
        sortedVideos = sortedVideos.sort((a, b) => {
          const dateA = new Date(a.snippet.publishedAt);
          const dateB = new Date(b.snippet.publishedAt);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case "moreViews":
        sortedVideos = sortedVideos.sort((a, b) => {
          const viewsA = a.statistics?.viewCount || 0;
          const viewsB = b.statistics?.viewCount || 0;
          return viewsB - viewsA;
        });
        break;
      case "lessViews":
        sortedVideos = sortedVideos.sort((a, b) => {
          const viewsA = a.statistics?.viewCount || 0;
          const viewsB = b.statistics?.viewCount || 0;
          return viewsA - viewsB;
        });
        break;
      default:
        break;
    }

    setVideoList(sortedVideos);
  }, [videos, sortOption]);

  return (
    <section className="video-list">
      <div className="video-list__name-sort">
        <h5>Channel name:</h5>
        <h1>{channelTitle}</h1>
        <div>
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="dateDesc">Recent</option>
            <option value="dateAsc">Oldest</option>
            <option value="moreViews">More Views</option>
            <option value="lessViews">Less Views</option>
          </select>
        </div>
      </div>
      <ul className="video-list__list">
        {videoList.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
          const publishedAt = video.snippet.publishedAt;
          const viewCount = video.statistics?.viewCount;
          const titleHashMD5 = md5(title);

          return (
            <li key={video.id.videoId} className="video-list__list__card">
              <div>
                <img src={thumbnailUrl} alt={`Thumbnail for ${title}`} />
                <p>
                  <span style={{ color: "#ffed00" }}>Nombre del Vídeo: </span>
                  {title}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>Fecha de Subida: </span>
                  {publishedAt}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>Visitas: </span>
                  {viewCount !== undefined ? viewCount : "N/A"}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>
                    Hash MD5 del Título:{" "}
                  </span>
                  {titleHashMD5}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default VideoList;
