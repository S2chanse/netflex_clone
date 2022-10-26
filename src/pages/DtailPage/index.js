import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../components/MovieModal/MovieModal.css";

export default function DetailPage() {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovies(movieId);
  }, []);

  const fetchMovies = async movieId => {
    const req = await axios.get(`/movie/${movieId}`);
    console.log(req);
    setMovie(req.data);
  };
  return movie !== null ? (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="movie"
      />
    </section>
  ) : (
    <div>Is Not Information</div>
  );
}
