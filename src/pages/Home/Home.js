import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import List from "../../components/List/List";
import { fetchUpcomingNewRelease, fetchMovie } from "../../utils/api";
import { getRandomNewReleaseMovie } from "../../utils/api";
import { useSelector } from "react-redux";

function Home({ collectionInfo }) {
  const [upcomingMovie, setUpComingMovie] = useState();
  const [newReleaseMovie, setNewReleaseMovie] = useState();
  const [movieData, setMovieData] = useState();
  const [trailerKey, setTrailerKey] = useState();
  const currentUserInfo = useSelector((state) => state.currentUserInfo);
  const isLogin = useSelector((state) => state.isLogin);
  const uid = currentUserInfo?.uid

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
      {isLogin ? (
        <List listGenre={"My List"} collectionInfo={collectionInfo} uid={uid}/>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
