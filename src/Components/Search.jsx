import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataState } from "../Context/Context";
import axios from "axios";
import { useEffect } from "react";

export default function Search() {
  const { keyword, SetKeyword, results, setResults, fetchResults } = DataState();
  return (<div className="lg:h-32 bg-slate-900 h-20 flex flex-col items-center justify-around">
    <div className="font-black text-slate-200 text-3xl ">Explore</div>
    <div className="bg-slate-200 rounded-lg w-auto md:w-2/3 p-2 flex flex-row mt-2">
      <input type="text" className="bg-slate-200 rounded-lg w-full pl-2 outline-none" onChange={(e) => SetKeyword(e.target.value)} value={keyword} />
      <div className="" onClick={fetchResults}> <FontAwesomeIcon icon={faSearch} /> </div>
    </div>
  </div>)
}