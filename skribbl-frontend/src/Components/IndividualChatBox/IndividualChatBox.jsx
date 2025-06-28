const IndividualChatBox = ({playerName , chatMessage}) => {
    console.log(playerName , chatMessage)
    return (
        <div className="flex flex-row w-full p-2 break-words my-2 bg-gray-100 rounded">
                <span className="px-2 font-semibold">{playerName}</span>
                <span className="px-2 w-3/4  ">
                    {chatMessage}
                </span>
        </div>
    )
}

export { IndividualChatBox }