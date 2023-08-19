import React from "react";
import { convertDuration } from "../../utils/functions";

const Feed = ({ data, handleClick }) => {
    return (
        <div className="bg-white rounded-lg border">
            <img
                src={data?.album.cover_medium}
                alt="something"
                className="block h-[300px] w-full bg-gray-400"
            />
            <div className="p-4">
                <p className="text-sm">{convertDuration(data.duration)}</p>
                <p className="block font-bold text-lg py-1 ">{data.title}</p>
                <a
                    className="text-sm italic text-gray-600 cursor-pointer hover:underline"
                    onClick={() => handleClick(data.artist.id)}
                >
                    By {data.artist.name}
                </a>
            </div>
        </div>
    );
};

export default Feed;
