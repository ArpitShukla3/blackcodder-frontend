import { useState } from 'react'
import './App.css'
import Search from './Components/Search'
import Filter from './Components/Filter'
import Graph from './Graphs/Graph'
import { DataState } from './Context/Context'
import Lottie from 'react-lottie'
import animation from "./animation/animation.json"
function App() {
  const [count, setCount] = useState(0)
  const { loading } = DataState();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <Search />
      <Filter />
      {(loading) ? <div className='w-80 lg:h-96 m-auto z-0'><Lottie options={defaultOptions} /> </div> : <Graph />}
    </>
  )
}

export default App
