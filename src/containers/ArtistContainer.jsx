import React from "react";
import { useQueries } from "react-query";
import api from "../api";
import { convertDuration } from "../utils/functions";
import Album from "../components/Album";

const ArtistContainer = ({ artistId }) => {
    const [artist, tracks, albums] = useQueries([
        {
            queryKey: ["fetch-artist", artistId],
            queryFn: () => api.fetchArtist(artistId),
        },
        {
            queryKey: ["fetch-artist-tracks", artistId],
            queryFn: () => api.fetchArtistTracks(artistId),
        },
        {
            queryKey: ["fetch-artist-albums", artistId],
            queryFn: () => api.fetchArtistAlbums(artistId),
        },
    ]);

    return (
        <div className="w-[800px] mx-auto">
            <div
                className="flex flex-col p-4 relative overflow-hidden h-[600px] bg-slate-200 bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${artist.data?.picture_big})` }}
            >
                <div className="bg-black text-sm text-white p-4 bg-opacity-50 w-max">
                    <p className="font-bold text-3xl pb-4">
                        {artist?.data?.name}
                    </p>
                    <p className="text-slate-200">
                        <span className="italic">
                            Fans: <span>{artist.data?.nb_fan}</span>
                        </span>
                    </p>
                    <p className="text-slate-200">
                        <span className="italic">
                            Albums: <span>{artist.data?.nb_album}</span>
                        </span>
                    </p>
                </div>
                <div className="p-4 relative bg-white min-w-[200px] max-w-[300px] w-max ml-auto mt-auto">
                    <p className="font-semibold pb-4">Top Tracks</p>
                    {tracks.isLoading && (
                        <p className="italic pb-4">Loading...</p>
                    )}{" "}
                    {!tracks.isLoading && tracks.data?.data.length === 0 && (
                        <p className="italic text-sm">No tracks found</p>
                    )}
                    <ul>
                        {tracks.data?.data.length > 0 &&
                            tracks.data.data.map((item, index) => (
                                <li
                                    className="flex items-center space-x-3 text-sm border-t text-gray-600 py-2"
                                    key={item.id}
                                >
                                    <span>{index + 1}</span>
                                    <span className="flex-1 font-medium">
                                        {item.title}
                                    </span>
                                    <span>
                                        {convertDuration(item.duration)}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-xl font-bold mb-4">Albums</h2>
                {albums.isLoading && <p className="italic">Loading...</p>}
                {albums?.data?.data && albums?.data?.data.length === 0 && (
                    <p>No result found</p>
                )}
                <div className="flex space-x-4 overflow-x-auto">
                    {albums.data?.data?.length > 0 &&
                        albums.data.data.map((item) => (
                            <Album data={item} key={item.id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistContainer;
