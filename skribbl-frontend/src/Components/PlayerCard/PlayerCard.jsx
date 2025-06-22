import { useContext } from "react"
import { PlayerIndividualCard } from "../PlayerIndividualCard/PlayerIndividualCard"
import { SocketContext } from "../../Context/SocketContext"

const PlayerCard = () => {
    const { allPlayers ,socketRef} = useContext(SocketContext);
    return (
        <div className="flex flex-col  bg-white h-full w-full">
            <div className="flex flex-row justify-center">
                <h1>Players</h1>
            </div>
            <hr />
            <div className="flex overflow-y-auto h-full flex-row">
                <div className="flex flex-col">
                    {allPlayers.map((player, index) => (
                        <PlayerIndividualCard playerName={player.name}></PlayerIndividualCard>

                    ))}
                </div>
            </div>
        </div>
    )
}


export { PlayerCard }