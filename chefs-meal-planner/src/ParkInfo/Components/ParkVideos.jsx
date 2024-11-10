/**
 * Renders a component that displays videos related to a specific park.
 * @module ParkVideos
 * @memberof ParkInfo
 * @param {Object} props - The component props.
 * @param {string} props.parkCode - The code of the park.
 * @returns {JSX.Element} The rendered component.
 */
import React, { useState, useEffect } from 'react';
import '../../Style/parkVideos.css';
import defaultSplash from '../../HomePage/Assets/splash-default.png';

const ParkVideos = ({ parkCode }) => {
    const [videos, setVideos] = useState([]);
    const [currVideo, setCurrVideo] = useState(0);
    const APIkey = 'Y7kFnm6SP5SMQhkTvwUSgyjge9buj4DbjrkuV2S0';

    const fetchVideos = async () => {
        try {
            const response = await fetch(
                `https://developer.nps.gov/api/v1/multimedia/videos?parkCode=${parkCode}&api_key=${APIkey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }

            const data = await response.json();

            console.log('Fetched videos:', data);

            // for videos without splash image, set default splash image
            const videosWithSplash = data.data.filter((video) => {
                if (video.splashImage.url =="") {
                    // console.log("No splash image found for video:", video.title);
                    video.splashImage = {url: defaultSplash}
                    return video;
                } else {
                    return video;
                }
            });
            console.log('Videos with splash image:', videosWithSplash);

            if (videosWithSplash.length === 0) {
                console.log('No videos with splash image found');
            }

            // // shuffle the array of videos with splash images + pick the first three
            // const VideosArray = videosWithSplash.sort(() => Math.random() - 0.5).slice(0, 3);

            // sort videos by title
            const selectedVideos = videosWithSplash.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });

            console.log('Videos Selected:', selectedVideos);

            setVideos(selectedVideos);
        } catch (error) {
            console.error('Error fetching or processing videos:', error);
        } finally {
            console.log('Done fetching videos');
        }
    };

    const handlePlayClick = (index) => {
        setVideos((prevVideos) => {
            const updatedVideos = prevVideos.map((video, i) => {
                i === index ? (video.playing = true) : (video.playing = false);
                return video;
            });
            return updatedVideos;
        }
        );
        setCurrVideo(index);

    };

    const nextVideo = () => {
        setCurrVideo((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrVideo((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    // Fetch videos on component mount
    useEffect(() => {
        fetchVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parkCode]);

    return (
        <div className="park-videos">
            {videos && videos.length > 0 ? (
                <div className="videos">
                    <h1>Videos</h1>
                    <div className = "videos-container">
                        <div key={videos[currVideo].id}>
                            <h2>{videos[currVideo].title}</h2>
                            <p>{videos[currVideo].description === videos[currVideo].title ? "" : videos[currVideo].description}</p>
                            <div className="video-container">
                                {videos[currVideo].splashImage && (
                                    <img
                                        src={videos[currVideo].splashImage.url}
                                        alt={`Splash for ${videos[currVideo].title}`}
                                        className="video-image"
                                    />
                                )}
                                {!videos[currVideo].playing && (
                                    <div className="play-button" onClick={() => handlePlayClick(currVideo)}>
                                        <p className="play-icon">▶</p>
                                    </div>
                                )}
                                {videos[currVideo].playing && (
                                    <iframe
                                        title={videos[currVideo].title}
                                        width="100%"
                                        height="100%"
                                        src={videos[currVideo].versions[0].url}
                                        allowFullScreen
                                        allow="autoplay; encrypted-media"
                                    ></iframe>
                                )}
                            </div>
                        </div>
                        <br></br>
                        <button className="park-info-button" onClick={prevVideo}>Previous</button>
                        <button className="park-info-button" onClick={nextVideo}>Next</button>
                    </div>
                </div>
            ) : <img src={defaultSplash} alt="placeholder of a tree"></img>}
            <br />
        </div>
    );
};

export default ParkVideos;
