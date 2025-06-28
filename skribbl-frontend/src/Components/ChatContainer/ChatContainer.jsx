import { useContext, useEffect  , useRef} from "react"
import { IndividualChatBox } from "../IndividualChatBox/IndividualChatBox"
import {useFormik} from "formik"
import { SocketContext } from "../../Context/SocketContext"

const ChatContainer = () => {
    const { socketRef  ,currentPlayer , messages} = useContext(SocketContext)
    
    const scrollToBottom = useRef(null);

    useEffect(() => {
        if(scrollToBottom.current){
            scrollToBottom.current.scrollIntoView({behavior:"smooth"})
        }
    } , [messages]) 
    const sendMessage = (message) => {
        console.log(currentPlayer)
        const payload = {
            name:currentPlayer.name,
            message: message
        }
        socketRef.current.emit("sendMessage" , payload);
    }
    const formik = useFormik({
        initialValues: {
            textMessage : ""
        },
        validate: (data) => {
            if(!data.textMessage){
                console.log("PLEASE ENTEr")
            }
        },
        onSubmit: (data) => {
            console.log(data);
            sendMessage(data.textMessage);
            formik.setFieldValue("textMessage" , "")
        }
    })
    return (
        <>
         <div className="flex flex-col bg-white h-[80vh] w-full overflow-y-scroll ">
            {/* Header */}
            <div className="flex flex-row justify-center">
                <h1>Chat</h1>
            </div>

            <hr />

            {/* Filler / Content Area */}
            <div className="flex-1">
                {messages && messages.map(( messageData ) => (
                    <IndividualChatBox playerName={messageData.senderName} chatMessage={messageData.message} />
                ))}
            </div>
            <div ref={scrollToBottom}></div>
        </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-row p-4 bg-gray-200">
                <input
                    type="text"
                    name="textMessage"
                    value={formik.values.textMessage}
                    onChange={formik.handleChange}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded"
                />
            </form>
        </>
       
        

    )
}
export {ChatContainer}