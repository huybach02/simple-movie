import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/scss";
import MovieCard from './MovieCard';
import useSWR from "swr";
import { fetcher } from "../../config";
import { Autoplay } from 'swiper';

//https://api.themoviedb.org/3/movie/now_playing?api_key=9ba3d941ec702fea10a2fdfee472204c


//https://api.themoviedb.org/3/movie/top_rated?api_key=9ba3d941ec702fea10a2fdfee472204c


// https://api.themoviedb.org/3/movie/popular?api_key=9ba3d941ec702fea10a2fdfee472204c


const MovieList = ({ type }) => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=9ba3d941ec702fea10a2fdfee472204c`, fetcher);
    const movies = data?.results || [];
    return (
        <div className="movie-list">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                spaceBetween={40}
                grabCursor={true}
                slidesPerView={"auto"}
                loop={true}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    );
};

export default MovieList;