import React from "react";

const Album = ({ data }) => {
    const year = data.release_date.split(/-/gi)[0];
    return (
        <div className="min-w-[200px] flex-grow">
            <img
                className="w-full h-auto"
                src={data.cover_medium}
                alt={data.title}
            />
            <p className="py-1">{data.title}</p>
            <p className="text-sm font-medium">{year}</p>
        </div>
    );
};

export default Album;
