import React, { useEffect, useState } from 'react';
import { API, fetcher } from '../config';
import MovieCard from '../components/movie/MovieCard';
import { useDebounce } from "@uidotdev/usehooks";
import Button from '../components/button/Button';
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;

const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(API.getMovieList("popular", nextPage));
    const filterDebounce = useDebounce(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    const { data, error, size, setSize } = useSWRInfinite(
        (index) => url.replace("page=1", `page=${index + 1}`),
        fetcher
    );
    const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
    const loading = !data && !error;
    const isEmpty = data?.[0]?.results.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
    useEffect(() => {
        if (filterDebounce) {
            setUrl(API.getMovieSearch(filterDebounce, nextPage));
        } else {
            setUrl(API.getMovieList("popular", nextPage));
        }
    }, [filterDebounce, nextPage]);
    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);

    return (
        <div className="py-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 text-white outline-none"
                        placeholder="Type here to search..."
                        onChange={handleFilterChange}
                    />
                </div>
                <button className="p-4 bg-primary text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {!loading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="mt-10 text-center">
                <Button
                    onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
                    disabled={isReachingEnd}
                    className={`${isReachingEnd ? "bg-slate-300 cursor-default" : ""}`}
                >
                    Load more...
                </Button>
            </div>

        </div>
    );
};

export default MoviePage;