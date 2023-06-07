import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { fetcher, API } from '../config';
import { Autoplay } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react';
import MovieCard from '../components/movie/MovieCard';

// https://api.themoviedb.org/3/movie/343611?api_key=9ba3d941ec702fea10a2fdfee472204c'

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data } = useSWR(API.getMovieDetails(movieId), fetcher);
    if (!data) return null;
    return (
        <>
            <div className="w-full h-[600px] relative" >
                <div className='absolute inset-0 bg-black bg-opacity-70'></div>
                <div className="w-full h-full bg-cover bg-no-repeat rounded-lg"
                    style={{
                        backgroundImage: `url(${API.imageOriginal(data.backdrop_path)})`
                    }}>
                </div>
            </div>
            <div className="w-full h-[400px] max-w-[1000px] mx-auto -mt-[200px] relative z-10 mb-10">
                <img src={API.imageOriginal(data.poster_path)} alt="" className='w-full h-full object-cover rounded-lg' />
            </div>
            <h1 className='text-center text-5xl font-bold text-white mb-10'>{data.title || data.name}</h1>
            <div className="flex items-center justify-center gap-x-5 mb-10">
                {data.genres.length > 0 && data.genres.map((item) => (
                    <span className='py-2 px-4 border-primary bg-primary rounded-lg' key={item.id}>{item.name}</span>
                ))}
            </div>
            <p className="text-center leading-relaxed max-w-[800px] mx-auto mb-10">{data.overview}</p>
            <MovieCredits></MovieCredits>
            <MovieVideo></MovieVideo>
            <MovieSimilar></MovieSimilar>
        </>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(API.getMovieInfo(movieId, "credits"), fetcher);
    if (!data) return null;
    if (!data.cast || data.cast.length <= 0) return null;
    return (
        <>
            <h2 className='text-center text-3xl mb-10 font-bold'>Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {data.cast.slice(0, 4).map((item) => (
                    <div key={item.id} className="cast-item">
                        <img src={API.imageOriginal(item.profile_path)} alt="" className='w-full h-[350px] object-cover rounded-lg mb-3' />
                        <h3 className='text-center text-lg mb-16'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}

function MovieVideo() {
    const { movieId } = useParams();
    const { data } = useSWR(API.getMovieInfo(movieId, "videos"), fetcher);
    if (!data) return null;
    if (!data.results || data.results.length <= 0) return null;
    return (
        <div className=''>
            <h2 className='text-center text-3xl font-bold mb-10'>Trailers and videos about this movies</h2>
            {data.results.slice(0, 3).map((item) => (
                <div key={item.id} className='lg:w-[1000px] aspect-video mx-auto mb-10'>
                    <h3 className='mb-5 text-xl font-medium bg-primary inline-block px-4 py-2 rounded-lg'>{item.name}</h3>
                    <iframe src={`https://www.youtube.com/embed/${item.key}`} title={item.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className='w-full h-full object-fill '></iframe>
                </div>
            ))}
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(API.getMovieInfo(movieId, "similar"), fetcher);
    if (!data) return null;
    return (
        <div >
            <h2 className='text-center text-3xl font-bold mb-10'>Similar movies</h2>
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
                    {data.results.length > 0 && data.results.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieDetailPage;