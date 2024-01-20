import React, { useState } from "react";
import ReactPaginate from "react-paginate";

interface VideoListProps {
  videos: any[];
}

const ITEMS_PER_PAGE = 10;

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const paginatedVideos = videos.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const currentChannel =
    paginatedVideos.length > 0 ? paginatedVideos[0].snippet.channelTitle : "";

  return (
    <div>
      <h2>Lista de Vídeos</h2>
      {currentChannel && <h3>Canal: {currentChannel}</h3>}
      <ul>
        {paginatedVideos.map((video) => {
          console.log("Contenido del video:", video);
          const title = video.snippet.title;
          const publishedAt = video.snippet.publishedAt;
          const viewCount = video.statistics?.viewCount;

          return (
            <li key={video.id.videoId}>
              <p>Nombre del Vídeo: {title}</p>
              <p>Fecha de Subida: {publishedAt}</p>
              <p>Visitas: {viewCount !== undefined ? viewCount : "N/A"}</p>
              {/*hash MD5 */}
            </li>
          );
        })}
      </ul>
      <div className="pagination-container">
        <ReactPaginate
          pageCount={Math.ceil(videos.length / ITEMS_PER_PAGE)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousLabel="Anterior"
          nextLabel="Siguiente"
        />
      </div>
    </div>
  );
};

export default VideoList;
