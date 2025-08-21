import { useEffect } from "react";
import { createContext, useCallback, useRef  , useState} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [currentPlayer , setCurrentPlayer] = useState({});
  const [allPlayers , setAllPlayers ] = useState([]);
  const [showGameSettingsModal , setShowGameSettingsModal] = useState(false);
  const [gameSettings , setGameSettings] = useState({});
  const [isGameStarted , setIsGameStarted] = useState(false);
  const [messages , setMessages] = useState([]);
  const [selectedWordData , setSelectedWordData] = useState({});
  const [correctGuessedPlayers , setCorrectGuessedPlayers] = useState([]);

  useEffect(() => {
    if(currentPlayer?.isOwner === true && Object.keys(gameSettings).length === 0){
      setShowGameSettingsModal(true)
    }
  } , [currentPlayer , allPlayers ])
  
  useEffect(() => {
    console.log(isGameStarted , "ASD")
  } , [isGameStarted])
  const handleGameStart = useCallback((data) => {
    setIsGameStarted(true)
  } , [])
  const handleAddGameSettings = useCallback((data) => {
    setGameSettings(data);
  } , [])
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
  setMessages((prev) => [...prev, data]);
}, []);

  const handleRemovePlayer = useCallback( (data) => {
    setAllPlayers((prev) => prev.filter((item) => item.socketid !== data.socketid));
  } , [])

  const handleTallyPlayers = useCallback((data) => {
    setAllPlayers(data);
  } , [])

  const handleSetWords =useCallback( (data) => {
    setSelectedWordData(data);
    console.log(data , "ASDASD")
  } , [])

  const handleCorrectGuessedPlayer = useCallback((data) => {
      console.log("DATA ," ,data)
      setCorrectGuessedPlayers((prev) => [...prev, data])
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
    <SocketContext.Provider value={{ socketRef, connectSocketServer,currentPlayer , setCurrentPlayer, handleCorrectGuessedPlayer, correctGuessedPlayers , messages, handleRemovePlayer ,handleAddMessage, allPlayers , handleTallyPlayers,  handleAddPlayer  , handleSetWords , selectedWordData , showGameSettingsModal , handleAddGameSettings , gameSettings , setShowGameSettingsModal , handleGameStart , isGameStarted} }>
      {children}
    </SocketContext.Provider>
  );
};
