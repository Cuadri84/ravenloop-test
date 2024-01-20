import React, { useState, useEffect } from "react";
import md5 from "md5";

interface VideoListProps {
  videos: any[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const channelTitle = videos[0]?.snippet.channelTitle;
  const [videoList, setVideoList] = useState(videos);
  const [sortOption, setSortOption] = useState<string>("dateDesc");

  const handleDeleteAll = () => {
    setVideoList([]);
  };

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
    <div>
      <h1>{channelTitle}</h1>
      <h2>Lista de Vídeos</h2>
      <div>
        <button onClick={handleDeleteAll}>Borrar toda la lista</button>
        <label>Ordenar por:</label>
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="dateDesc">Fecha Descendente</option>
          <option value="dateAsc">Fecha Ascendente</option>
          <option value="moreViews">Más Vistas</option>
          <option value="lessViews">Menos Vistas</option>
        </select>
      </div>
      <ul>
        {videoList.map((video) => {
          const title = video.snippet.title;
          const publishedAt = video.snippet.publishedAt;
          const viewCount = video.statistics?.viewCount;
          const titleHashMD5 = md5(title);

          return (
            <li key={video.id.videoId}>
              <p>Nombre del Vídeo: {title}</p>
              <p>Fecha de Subida: {publishedAt}</p>
              <p>Visitas: {viewCount !== undefined ? viewCount : "N/A"}</p>
              <p>Hash MD5 del Título: {titleHashMD5}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VideoList;
