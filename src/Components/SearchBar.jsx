import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataState } from "../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faCross, faCut, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SERVER } from "../../UrlList.js";

function SearchBar(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState("");
    const [show, setShow] = useState(false);
    const itemList = props.options;
    const { fetch, refetch, setLoading } = DataState();
    // function debounce(func, timeout = 1000) {
    //     let timer;
    //     return (...args) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => { func.apply(this, args); }, timeout);
    //     };
    // }
    function debounce(cb, delay = 2000) {
        let timerId;
        return (...args) => {
            clearTimeout(timerId)
            timerId = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }

    const debouncedSearch = debounce(() => { console.log("query"); });
    const handleInputChange = (event) => {
        setShow(true)
        const query = event.target.value;
        if (query === "") {
            setShow(false);
        }

        setSearchQuery(query);

    };

    async function downloadData(query, type) {
        setLoading(true)
        const filtered = await axios.get(`${SERVER}/search?search=${query}&type=${type}`)
        setFilteredItems(filtered.data.data);
        setLoading(false);
    }
    useEffect(() => {
        downloadData("", props.type);
    }, [])
    return (
        <div className=" rounded-sm outline-none text-black bg-gray-50-500 lg:m-4 m-2 " >
            <label htmlFor={props.type} className="text-gray-200">{props.type}: </label>
            <div className=" bg-slate-50" onClick={() => { downloadData("", props.type); setShow(true) }}>
                <input
                    id={props.type}
                    type="text"
                    placeholder={" " + props.type}
                    value={searchQuery}
                    onChange={(e) => { debouncedSearch(e.target.value); handleInputChange(e); }}
                    className="rounded"

                />
                {(show) ? <FontAwesomeIcon icon={faXmark} onClick={() => { setSearchQuery(""); setShow(false); props.setOptions(""); refetch(2 * fetch) }} /> : <FontAwesomeIcon icon={faArrowCircleDown} />}
            </div>
            {show &&
                <div className="relative">
                    <ul className="bg-white h-auto overflow-scroll z-10 cursor-pointer absolute">
                        <li className="text-gray-600 -z-10 hover:bg-gray-400" onClick={() => { setSearchQuery(""); setShow(false); props.setOptions(""); refetch(2 * fetch) }}>none</li>
                        {searchQuery === "" ? (
                            itemList.map((item, index) => (
                                <li className="hover:bg-gray-400" key={index} onClick={() => { setLoading(true); setSearchQuery(item); setShow(false); props.setOptions(item); refetch(2 * fetch) }}>
                                    {item}
                                </li>
                            ))
                        ) : filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <li key={index} onClick={() => { setLoading(true); setSearchQuery(item); setShow(false); props.setOptions(item); refetch(2 * fetch) }}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li className="text-orange-800 text-center font-black" >No matching items found</li>
                        )}
                    </ul>
                </div >
            }
        </div >
    );
};

export default SearchBar;