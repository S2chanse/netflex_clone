import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
  //Detail page를 위한 navigate
  const navigate = useNavigate();
  //Search 언어
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searhWords = useDebounce(query.get("q"), 0);
  useEffect(() => {
    if (searhWords) {
      fetchSearchMovie(searhWords);
    } else {
      navigate("/");
    }
  }, [searhWords]);

  const fetchSearchMovie = async searhWords => {
    try {
      const req = await axios.get(
        `/search/multi?include_adult=false&query=${searhWords}`
      );
      console.log("req", req);
      setSearchResults(req.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map(movie => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img src={movieImgUrl} alt="movie" className="movie-poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 "{searhWords}"(으)로는 검색결과가 없습니다.</p>
        </div>
      </section>
    );
  };
  return renderSearchResults();
}
