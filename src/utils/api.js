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
// 搜尋電影的API
  export async function fetchSearch(query) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`
    );
    const json = await response.json();
    return json;
  }

// 抓castAPI  
  export async function fetchCast(movie_id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`
    );
    const json = await response.json();
    return json;
  }

  export async function fetchMultiMovies(movieArr) {
  
    const set = new Set();
    const filterResult = movieArr.filter((movie) =>
      !set.has(movie.movie_id) ? set.add(movie.movie_id) : false
    );
  
    let movieIdArr = [];
    filterResult.forEach((movie) => {
      movieIdArr.push(
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
        )
      );
    });
    let result = await Promise.all(movieIdArr).then((res) => {
      return Promise.all(res.map(async (data) => await data.json()));
    });
    return result;
  }