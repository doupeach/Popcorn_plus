import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import List from "../../components/List/List";
import { fetchUpcomingNewRelease, fetchMovie } from "../../utils/api";
import { getRandomNewReleaseMovie } from "../../utils/api";

function Home({ user, uid, collectionInfo }) {
  const [upcomingMovie, setUpComingMovie] = useState();
  const [newReleaseMovie, setNewReleaseMovie] = useState();
  const [movieData, setMovieData] = useState();
  const [trailerKey, setTrailerKey] = useState();

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchUpcomingNewRelease().then(([upcoming, newRelease]) => {
        setNewReleaseMovie(newRelease);
        setUpComingMovie(upcoming);
      });
    }
    return () => {
      isMount = false; // 防止 memory leak
    };
  }, []);

  // getRandomNewReleaseMovie
  useEffect(() => {
    const randomIndex = getRandomNewReleaseMovie(
      newReleaseMovie?.results.length
    );
    setMovieData(newReleaseMovie?.results[randomIndex]);
  }, [newReleaseMovie]);

  // fetchTrailer
  useEffect(() => {
    let isMount = true;
    if (movieData) {
      if (isMount) {
        fetchMovie(movieData.id).then((res) => {
          setTrailerKey(res.videos.results[0]?.key);
        });
      }
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, [movieData]);

  return (
    <div className="Home">
      <Banner movieData={movieData} trailerKey={trailerKey} uid={uid} />
      <List listGenre={"Upcoming"} listData={upcomingMovie} uid={uid} />
      <List listGenre={"New Releases"} listData={newReleaseMovie} uid={uid} />
      {user ? (
        <List listGenre={"My List"} collectionInfo={collectionInfo} uid={uid}/>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
