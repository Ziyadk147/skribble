import { useContext, useEffect, useRef, useState } from 'react'
import { Board } from './Components/Board/Board'
import { PlayerCard } from './Components/PlayerCard/PlayerCard'
import { UserDetailInputModal } from './Components/UserDetailInputModal/UserDetailInputModal';
import { SocketContext } from './Context/SocketContext';
function App() {
  const [showModal , setShowModal] = useState(true)
  const {socketRef , connectSocketServer,username ,currentPlayer ,handleTallyPlayers , handleRemovePlayer ,   handleAddPlayer } = useContext(SocketContext)
  
  useEffect(() => {
    if(!socketRef.current ||!socketRef.current.connected  ){
      connectSocketServer("http://localhost:5000/")
    }
  }, [socketRef])

  useEffect(() => {
  if (!socketRef.current) return;

  const socket = socketRef.current;

  const handlePlayerJoin = (data) => {
    handleAddPlayer(data);
  };

  // Only attach listener if connected, or listen for connect event and then attach
  if (socket.connected) {
    socket.on("playerJoin", (data) => {
      handleAddPlayer(data);
    });
  } else {
    // wait for connection
    socket.once("connect", () => {
      socket.on("playerJoin", handlePlayerJoin);
    });
  }
  socket.on("playerLeft" , (data) => {
    handleRemovePlayer(data);
  })
  socket.on("currentPlayers" , (data) =>{
    console.log(data , "YALLY")
    handleTallyPlayers(data);
  });
  return () => {
    socket.off("playerJoin", handlePlayerJoin);
  };
}, [socketRef, handleAddPlayer]);

  return (
    <>
      {showModal && (
        <UserDetailInputModal setShowModal={setShowModal} />
      )}

      <div className="bg-stone-800 flex flex-col lg:flex-row lg:justify-between h-screen w-screen">
        <div className="flex-col h-[41vh] mt-5 w-[20rem] hidden lg:flex">
          <PlayerCard username={username} />
        </div>
        <div className="flex flex-col flex-1">
          <Board username={username} />
        </div>
        <div className="mobile lg:hidden md:hidden">
          <div className="flex h-[20vh] flex-row w-1/2">
            <PlayerCard username={username} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
