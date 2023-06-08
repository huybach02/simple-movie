import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button";
import {API} from "../../config";

const MovieCard = ({item}) => {
    const navigate = useNavigate();
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <img
                src={API.image500(item.poster_path)}
                alt=""
                className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">
                    {item.title || item.name}
                </h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>{new Date(item.release_date).getFullYear()}</span>
                    <span>IMDb: {item.vote_average}</span>
                </div>
                <Button onClick={() => navigate(`/movies/${item.id}`)}>
                    Watch Now
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
