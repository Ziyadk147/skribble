import { useContext, useEffect, useState } from 'react';
import { Board } from './Components/Board/Board';
import { PlayerCard } from './Components/PlayerCard/PlayerCard';
import { UserDetailInputModal } from './Components/UserDetailInputModal/UserDetailInputModal';
import { SocketContext } from './Context/SocketContext';
import { ChatContainer } from './Components/ChatContainer/ChatContainer';
function App() {
  const [showModal, setShowModal] = useState(true);
  const { socketRef, connectSocketServer, username, handleAddMessage,handleTallyPlayers, handleRemovePlayer, handleAddPlayer } = useContext(SocketContext);

  // Connect socket
  useEffect(() => {
    if (!socketRef.current || !socketRef.current.connected) {
      connectSocketServer("http://localhost:5000/");
    }
  }, [socketRef]);

  // Setup event listeners
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handlePlayerJoin = (data) => {
      handleAddPlayer(data);
    };

    if (socket.connected) {
      socket.on("playerJoin", handlePlayerJoin);
    } else {
      socket.once("connect", () => {
        socket.on("playerJoin", handlePlayerJoin);
      });
    }

    socket.on("playerLeft", (data) => {
      handleRemovePlayer(data);
    });

    socket.on("currentPlayers", (data) => {
      console.log(data, "PLAYER LIST");
      handleTallyPlayers(data);
    });
    socket.on("messageUpdate" , (data) => {
      handleAddMessage(data);
    })

    return () => {
      socket.off("playerJoin", handlePlayerJoin);
      socket.off("playerLeft");
      socket.off("currentPlayers");
      socket.off('messageUpdate');
    };
  }, [socketRef, handleAddPlayer, handleRemovePlayer, handleTallyPlayers]);

  return (
    <>
      {showModal && <UserDetailInputModal setShowModal={setShowModal} />}

      <div className="bg-stone-800 flex flex-col h-screen w-screen">
        {/* Header */}
        <div className="flex justify-center items-center bg-gray-900 text-white text-2xl py-4">
          Hello
        </div>

        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Sidebar (PlayerCard) - Desktop Only */}
          <div className="hidden lg:flex flex-col w-[20rem] p-4">
            <PlayerCard username={username} />
          </div>

          {/* Game Board */}
          <div className="flex flex-1 justify-center items-center p-4">
            <Board username={username} />
          </div>
           <div className="hidden lg:flex flex-col w-[20rem] p-4">
            <ChatContainer />
          </div>

          {/* Sidebar (PlayerCard) - Mobile Only */}
          <div className="flex lg:hidden md:hidden w-full p-4">
            <PlayerCard username={username} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
