import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {API, fetcher} from "../config";
import MovieCard from "../components/movie/MovieCard";
import {useDebounce} from "@uidotdev/usehooks";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;

const MoviePage = () => {
    const [inputValue, setInputValue] = useState("");
    const [nextPage, setNextPage] = useState(1);

    const [url, setUrl] = useState(API.getMovieList("popular", nextPage));
    const debounce = useDebounce(inputValue, 500);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const {data, error} = useSWR(url, fetcher);

    const [loading, setLoading] = useState(!data && !error);

    useEffect(() => {
        if (debounce) {
            setUrl(API.getMovieSearch(debounce, nextPage));
        } else {
            setUrl(API.getMovieList("popular", nextPage));
        }
    }, [debounce, nextPage]);

    const movies = data?.results || [];

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        setLoading(true);
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
        setLoading(false);
    }, [data, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };

    return (
        <div className="pb-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 outline-none text-white rounded-tl-lg rounded-bl-lg"
                        placeholder="Type here to search film..."
                        onChange={handleInputChange}
                    />
                </div>
                <button className="p-4 bg-primary text-white rounded-tr-lg rounded-br-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            className="w-6 h-6"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
            )}
            <div className="grid grid-cols-4 gap-10">
                {!loading &&
                    movies &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
};

export default MoviePage;
