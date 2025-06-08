import { useRef, useState } from 'react'
import { Board } from './Components/Board/Board'
import { PlayerCard } from './Components/PlayerCard/PlayerCard'
function App() {
  return (
    <>
      <div className="bg-stone-800 flex flex-col lg:flex-row lg:justify-between  h-screen w-screen">
        <div className=" flex-col h-[41vh] mt-5 w-[20rem] hidden lg:flex">
            <PlayerCard />

        </div>
        <div className="flex flex-col flex-1 ">
          <Board />
        </div>
        <div className="mobile lg:hidden md:hidden">
          <div className="flex h-[20vh]  flex-row w-1/2">
            <PlayerCard />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
