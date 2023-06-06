import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/scss";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";


const Banner = () => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=9ba3d941ec702fea10a2fdfee472204c`, fetcher);
    const movies = data?.results || [];
    console.log('movies: ', movies);
    return (
        <section className="banner h-[400px] page-container mb-20 overflow-hidden">
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                slidesPerView={"auto"}
                loop={true}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

function BannerItem({ item }) {
    return (
        <div className="h-full w-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{item.title || item.name}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className="py-2 px-4 border border-white rounded-md">Action</span>
                </div>
                <button className="py-3 px-6 rounded-lg bg-primary">Watch Now</button>
            </div>
        </div>
    );
}

export default Banner;