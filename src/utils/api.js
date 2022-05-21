const apiKey = process.env.REACT_APP_TMDB_API_KEY

// 進來首頁打API抓電影資料 
export async function fetchUpcomingNewRelease() {
    const [upcoming, newRelease] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&append_to_response=videos`),
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&append_to_response=videos`),
    ]);
    const upcomingMovies = await upcoming.json();
    const newReleaseMovies = await newRelease.json();
    return [upcomingMovies, newReleaseMovies];
  }

// 用電影ID去抓該電影的資料
  export async function fetchMovie(movie_id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );
    const json = await response.json();
    return json;
  }