import { useContext } from "react"
import { SocketContext } from "../../Context/SocketContext"
import { useEffect } from "react";

const WordHeader = () => {
    const {socketRef , selectedWordData} = useContext(SocketContext);
   
    useEffect(() => {
      console.log(selectedWordData , "WORDS")
    },[selectedWordData])
    function generateRandomWord() {
      if(socketRef.current){
        socketRef.current.emit("generateWord" );
      }
    }
    return (
        <div className="flex gap-4 justify-center w-full items-center bg-gray-900 text-white text-2xl py-4">
          <div className="flex-col">
            <button className="btn  bg-white  text-stone-900 p-4" onClick={generateRandomWord}> Generate Random </button>
          </div>
          <div className="flex flex-col">
            {selectedWordData?.randomWord}
          </div>
          <div className="flex flex-col">
            {selectedWordData?.spacifiedWord}
          </div>
        </div>
    )
}

export { WordHeader }