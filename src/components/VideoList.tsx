import React from "react";
import md5 from "md5";

interface VideoListProps {
  videos: any[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div>
      <h2>Lista de Vídeos</h2>
      <ul>
        {videos.map((video) => {
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
