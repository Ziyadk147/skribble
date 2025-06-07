import { useRef, useState } from 'react'
import { Board } from './Components/Board/Board'
function App() {
  return (
    <>
     <div className="bg-stone-800 h-screen w-screen">
        <div className="flex flex-row">
            <Board /> 
        </div>
     </div>
    </>
  )
}

export default App
