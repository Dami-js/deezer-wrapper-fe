import { useRef, useState } from "react";
import Feed from "./components/Feed";
import api from "./api";
import ArtistContainer from "./containers/ArtistContainer";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import Header from "./containers/Header";

function App() {
    const [value, setValue] = useState("");
    const [currentId, setCurrentId] = useState(null);
    const ref = useRef();

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["search"],
        queryFn: () => api.search({ query: value || "afro" }),
    });

    if (currentId) {
        return (
            <div className="min-h-screen pb-20 bg-slate-100">
                <div className="container mx-auto px-4">
                    <header className="py-10 text-center">
                        <a
                            onClick={() => setCurrentId(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            Home
                        </a>
                    </header>
                    <div className="">
                        <ArtistContainer artistId={currentId} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-slate-100">
            <div className="container mx-auto px-4">
                <Header
                    handleSubmit={handleSubmit}
                    onChange={(e) => setValue(e.target.value)}
                    handleHome={() => setCurrentId(null)}
                    value={value}
                />

                <div className="mb-5">
                    <p>Search results ({data?.data?.length})</p>
                </div>
                {isLoading && (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                        <Skeleton height={300} />
                        <Skeleton height={300} />
                        <Skeleton height={300} />
                        <Skeleton height={300} />
                    </div>
                )}

                {!isLoading && data?.data?.length > 0 && (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                        {data?.data.map((item) => (
                            <Feed
                                key={item.id}
                                data={item}
                                handleClick={(id) => setCurrentId(id)}
                            />
                        ))}
                    </div>
                )}
                {!isLoading && data?.data?.length === 0 && (
                    <p>No result found</p>
                )}
            </div>
        </div>
    );

    async function handleSubmit(e) {
        e?.preventDefault();
        refetch();
    }
}

export default App;
