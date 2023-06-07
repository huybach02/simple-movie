export const fetcher = (...args) => fetch(...args).then(res => res.json());

export const api_key = "9ba3d941ec702fea10a2fdfee472204c";

const api_endpoint = "https://api.themoviedb.org/3/movie";

export const API = {
    getMovieList: (type, page = 1) => `${api_endpoint}/${type}?api_key=${api_key}&page=${page}`,
    getMovieDetails: (movieId) => `${api_endpoint}/${movieId}?api_key=${api_key}`,
    getMovieInfo: (movieId, type) => `${api_endpoint}/${movieId}/${type}?api_key=${api_key}`,
    getMovieSearch: (query, page) => `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`
};