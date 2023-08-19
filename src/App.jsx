import { useEffect, useRef, useState } from "react";
import Feed from "./components/Feed";
import Input from "./components/Input";
import Button from "./components/Button";
import api from "./api";
import ArtistContainer from "./containers/ArtistContainer";

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const ref = useRef();

    useEffect(() => {
        handleSubmit();
    }, []);

    if (currentId) {
        return (
            <div className="min-h-screen pb-20 bg-slate-100">
                <div className="container mx-auto px-4">
                    <header className="py-10 text-center">
                        <a href="/" className="text-blue-500">
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
                <header className="py-10 text-center">
                    <a href="/" className="text-blue-500">
                        Home
                    </a>
                </header>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-start space-x-6 w-full"
                    >
                        <Input name="search" className="flex-1" ref={ref} />
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                <div className="mb-5">
                    <p>Search results ({data.length})</p>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {data.length > 0 ? (
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                                {data.map((item) => (
                                    <Feed
                                        key={item.id}
                                        data={item}
                                        handleClick={(id) => setCurrentId(id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No result found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    async function handleSubmit(e) {
        e?.preventDefault();
        try {
            setLoading(true);
            const value = ref.current.value;
            const result = await api.search({ query: value || "afro" });
            setData(result.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
}

export default App;
