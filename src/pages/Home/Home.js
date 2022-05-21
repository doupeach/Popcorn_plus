import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import List from "../../components/List";
import { fetchUpcomingNewRelease, fetchMovie } from "../../utils/api";
// import './Home.css';

function Home() {
  const [upcomingMovie, setUpComingMovie] = useState();
  const [newReleaseMovie, setNewReleaseMovie] = useState();
  const [movieData, setMovieData] = useState();
  const [trailerKey, setTrailerKey] = useState();

  const getRandomNewReleaseMovie = (max) => {
    return Math.floor(Math.random() * max);
  };

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

  console.log(upcomingMovie);
  console.log(newReleaseMovie);
  console.log(movieData);
  console.log(trailerKey);

  return (
    <div className="Home">
      <Navbar />
      <Banner movieData={movieData} trailerKey={trailerKey} />
      <List />
    </div>
  );
}

export default Home;