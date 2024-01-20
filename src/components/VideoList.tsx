import React, { useState, useEffect } from "react";
import md5 from "md5";

interface VideoListProps {
  videos: any[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const [videoList, setVideoList] = useState(videos);

  const handleDeleteAll = () => {
    setVideoList([]);
  };
  useEffect(() => {
    setVideoList(videos);
  }, [videos]);
  return (
    <div>
      <h2>Lista de Vídeos</h2>
      <button onClick={handleDeleteAll}>Borrar toda la lista</button>
      <ul>
        {videoList.map((video) => {
          console.log("Contenido del video:", video);
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
