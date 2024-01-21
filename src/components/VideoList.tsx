import React, { useState, useEffect } from "react";
import md5 from "md5";

interface VideoListProps {
  videos: any[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  // Extracting channel title from the first video in the list
  const channelTitle = videos[0]?.snippet.channelTitle;

  // State for the sorted video list and the current sort option
  const [videoList, setVideoList] = useState(videos);
  const [sortOption, setSortOption] = useState<string>("dateDesc");

  // Handler for sort option change
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  useEffect(() => {
    // Effect to sort videos based on the selected option
    let sortedVideos = [...videos];

    switch (sortOption) {
      case "dateDesc":
        sortedVideos = sortedVideos.sort(
          (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
        );
        break;
      case "dateAsc":
        sortedVideos = sortedVideos.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).getTime() -
            new Date(b.snippet.publishedAt).getTime()
        );
        break;
      case "moreViews":
        sortedVideos = sortedVideos.sort(
          (a, b) =>
            (b.statistics?.viewCount || 0) - (a.statistics?.viewCount || 0)
        );
        break;
      case "lessViews":
        sortedVideos = sortedVideos.sort(
          (a, b) =>
            (a.statistics?.viewCount || 0) - (b.statistics?.viewCount || 0)
        );
        break;
      default:
        break;
    }

    setVideoList(sortedVideos);
  }, [videos, sortOption]);

  return (
    <section className="video-list">
      <div className="video-list__name-sort">
        <div>
          {/* Displaying channel name */}
          <h5>Channel name:</h5>
          <h1>{channelTitle}</h1>
        </div>
        <div>
          {/* Dropdown for sorting options */}
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="dateDesc">Recent</option>
            <option value="dateAsc">Oldest</option>
            <option value="moreViews">More Views</option>
            <option value="lessViews">Less Views</option>
          </select>
        </div>
      </div>
      <ul className="video-list__list">
        {/* Mapping through the sorted video list */}
        {videoList.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
          const publishedAt = video.snippet.publishedAt;
          const viewCount = video.statistics?.viewCount;
          const titleHashMD5 = md5(title);

          return (
            <li key={video.id.videoId} className="video-list__list__card">
              <div>
                {/* Displaying video information */}
                <img src={thumbnailUrl} alt={`Thumbnail for ${title}`} />
                <p>
                  <span style={{ color: "#ffed00" }}>Video Name: </span>
                  {title}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>Upload Date: </span>
                  {publishedAt}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>Views: </span>
                  {viewCount !== undefined ? viewCount : "N/A"}
                </p>
                <p>
                  <span style={{ color: "#ffed00" }}>MD5 Hash of Title: </span>
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
