import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searhWords = query.get("q");
  console.log("searhWords", searhWords);
  useEffect(() => {
    if (searhWords) {
      fetchSearchMovie(searhWords);
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
              <div className="movie">
                <div className="movie__column-poster">
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
