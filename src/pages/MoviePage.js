import React, { useEffect, useState } from 'react';
import useSWR from "swr";
import { fetcher } from '../config';
import MovieCard from '../components/movie/MovieCard';
import { useDebounce } from "@uidotdev/usehooks";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 20;

const MoviePage = () => {

    const [inputValue, setInputValue] = useState("");
    const [nextPage, setNextPage] = useState(1);

    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=9ba3d941ec702fea10a2fdfee472204c&page=${nextPage}`);
    const debounce = useDebounce(inputValue, 500);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const { data, error } = useSWR(url, fetcher);
    console.log('data: ', data);

    const loading = !data && !error;

    useEffect(() => {
        if (debounce) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=9ba3d941ec702fea10a2fdfee472204c&query=${debounce}&page=${nextPage}`);
        }
        else {
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=9ba3d941ec702fea10a2fdfee472204c&page=${nextPage}`);
        }

    }, [debounce, nextPage]);

    const movies = data?.results || [];

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };

    return (
        <div className='pb-10 page-container'>
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text" className='w-full p-4 bg-slate-800 outline-none text-white rounded-tl-lg rounded-bl-lg' placeholder='Type here to search film...'
                        onChange={handleInputChange}
                    />
                </div>
                <button className='p-4 bg-primary text-white rounded-tr-lg rounded-br-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" className='w-6 h-6' />
                    </svg>

                </button>
            </div>
            {loading && <div className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin'></div>}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 && movies.map((item) => (
                    <MovieCard key={item.id} item={item}>
                    </MovieCard>
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
            <div className="flex items-center justify-center mt-10 gap-x-5 hidden">
                <span className='cursor-pointer leading-none rounded-lg inline-block hover:bg-primary p-3' onClick={() => nextPage > 1 && setNextPage(nextPage - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </span>

                {new Array(pageCount).fill(0).map((item, index) => (
                    <span key={index} className={`cursor-pointer leading-none rounded-lg inline-block hover:bg-primary  ${nextPage === index + 1 ? "bg-primary p-3" : "p-2"}`} onClick={() => setNextPage(index + 1)}>{index + 1}</span>
                ))}

                <span className='cursor-pointer leading-none rounded-lg inline-block hover:bg-primary p-3'
                    onClick={() => setNextPage(nextPage + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                </span>
            </div>
        </div>
    );
};

export default MoviePage;

