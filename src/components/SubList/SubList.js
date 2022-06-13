import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./SubList.css";

function SubList({ listsData = {}, noCastPhoto }) {
    
  const results = useMemo(() => {
    const data = listsData.data || [];
    return data.map((item, index) => {
      return { data: item, name: listsData.name[index] };
    });
  }, [listsData]);


  return (
    <>
      {results?.map((data) => {
        return (
          <>
            <h2 id="mylist-name">{data.name}</h2>
            <div className="mylist-result">
              {data.data.map((result) => {
                const url = result.poster_path
                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                  : noCastPhoto;
                return (
                  <Link to={`/movie/${result.id}`} key={result.id}>
                    <div className="mylist-card">
                      <img className="mylist-poster" src={url} alt="" />
                      <div className="mylist-title">
                        {result.original_title}
                      </div>
                      <div className="mylist-rating">{result.vote_average}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}

export default SubList;
