import { useContext, useState } from "react";
import { SocketContext } from "../../Context/SocketContext";
const UserDetailInputModal = ({setShowModal}) => {
    const [username, setUsername] = useState('');
    const {socketRef } = useContext(SocketContext) 

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
        setShowModal(false);
        if(socketRef.current){
            socketRef.current.emit("playerJoin" , {name: username} );
        }
    }
  };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Enter Your Username</h2>
            <form onSubmit={handleUsernameSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
    )
}


export { UserDetailInputModal }