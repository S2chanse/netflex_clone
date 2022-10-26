import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal/index";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//구조분해 할당으로 props 받음
function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  useEffect(() => {
    fetchMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    //console.log('request', request);
    setMovies(request.data.results);
  };
  const handleCllick = movie => {
    setModalOpen(true);
    setMovieSelected(movie);
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        //spaceBetween={50}
        //slidesPerView={5}
        navigation //arrow btn
        pagination={{ clickable: false }} //page btn
        scrollbar={{ draggable: false }}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            spaceBetween: 6
          },
          998: {
            slidesPerView: 5,
            spaceBetween: 5
          },
          625: {
            slidesPerView: 4,
            spaceBetween: 4
          },
          0: {
            slidesPerView: 3,
            spaceBetween: 3
          }
        }}
      >
        <div id={id} className="row__posters">
          {movies.map(movie => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => {
                  handleCllick(movie);
                }}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}

export default Row;
