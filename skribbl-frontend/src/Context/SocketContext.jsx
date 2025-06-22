import { useEffect } from "react";
import { createContext, useCallback, useRef  , useState} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [currentPlayer , setCurrentPlayer] = useState({});
  const [allPlayers , setAllPlayers ] = useState([]);
  const [messages , setMessages] = useState([]);

  useEffect(() => {
    console.log("currentPlayer " , currentPlayer  , "ALL " , allPlayers)
  } , [currentPlayer , allPlayers ])
  
  const handleAddPlayer = useCallback((data) => {
    setAllPlayers((prev) => {
      const alreadyExists = prev.some(p => p.socketid === data.socketid);
      if (!alreadyExists) {
        return [...prev, data];
      }
      return prev;
    });

    if (data.socketid === socketRef.current?.id) {
      setCurrentPlayer(data);
    }
  }, []);

  const handleAddMessage = useCallback((data) => {
    setMessages((prev) => {
      const alreadyExists = prev.some(p => p.socketid === data.socketid);
      if(!alreadyExists){
        return  [...prev, data]
      }
      return prev;
    });

  } , [])
  const handleRemovePlayer = useCallback( (data) => {
    setAllPlayers((prev) => prev.filter((item) => item.socketid !== data.socketid));
  } , [])

  const handleTallyPlayers = useCallback((data) => {
    setAllPlayers(data);
  } , [])
  const connectSocketServer = (serverAddress) => {
    if (!socketRef.current) {
      socketRef.current = io(serverAddress);

      socketRef.current.on("connect", () => {
        console.log("Socket connected! ID:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected.");
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socketRef, connectSocketServer,currentPlayer , messages, handleRemovePlayer ,handleAddMessage, allPlayers , handleTallyPlayers,  handleAddPlayer }}>
      {children}
    </SocketContext.Provider>
  );
};
