import { createContext ,useRef} from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext();

export const SocketProvider =({children}) => {

    const socketRef = useRef(null);


    const connectSocketServer = (serverAddress) => {
        socketRef.current = io(serverAddress);
        return () => {
            socketRef.current.disconnect();
        }
    }
    return(
        <SocketContext.Provider value={{socketRef , connectSocketServer}}>
            {children}
        </SocketContext.Provider>  
    )
}