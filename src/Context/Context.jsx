import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();
function Context({ children }) {
    const [keyword, SetKeyword] = useState("");
    const [end, setEnd] = useState("");
    const [topic, setTopic] = useState("");
    const [sector, setSector] = useState("");
    const [region, setRegion] = useState("");
    const [pestle, setPestle] = useState("");
    const [source, setSource] = useState("");
    const [swot, setSwot] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [results, setResults] = useState({ data: { success: true, data: [] } });
    const [fetch, refetch] = useState(1);
    const [loading, setLoading] = useState(true);
    const fetchResults = async () => {
        const res = await axios.get(`http://localhost:5001/query?keyword=${keyword}&end=${end}&topic=${topic}&sector=${sector}&region=${region}&pestle=${pestle}&source=${source}&swot=${swot}&country=${country}&city=${city}`);
        setResults(res);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        fetchResults();
    }, [fetch])
    return (
        <DataContext.Provider
            value={{
                keyword, SetKeyword,
                end, setEnd,
                topic, setTopic,
                sector, setSector,
                region, setRegion,
                pestle, setPestle,
                source, setSource,
                swot, setSwot,
                country, setCountry,
                city, setCity,
                results, setResults,
                fetch, refetch,
                loading, setLoading,
                fetchResults

            }}
        >{children}</DataContext.Provider>
    )
}
export const DataState = () => {
    return useContext(DataContext);
};
export default Context;