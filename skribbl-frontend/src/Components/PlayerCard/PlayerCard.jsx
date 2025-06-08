import { PlayerIndividualCard } from "../PlayerIndividualCard/PlayerIndividualCard"

PlayerIndividualCard
const PlayerCard = () => {
    return (
        <div className="flex flex-col  bg-white h-full w-full">
            <div className="flex flex-row justify-center">
                <h1>Players</h1>
            </div>
            <hr />
            <div className="flex overflow-y-auto h-full flex-row">
                <div className="flex flex-col">
                    <PlayerIndividualCard></PlayerIndividualCard>
                </div>
            </div>
        </div>
    )
}


export { PlayerCard }