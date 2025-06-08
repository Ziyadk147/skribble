const PlayerIndividualCard = () => {
    return (
        <div className="flex flex-row mt-4">
            <div className="flex flex-col">
                <span class="inline-flex items-center justify-center size-11 text-sm font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                    AC
                </span>
            </div>
            <div className="flex flex-col mx-2">
                <div className="flex-row flex">
                    <span className="font-extrabold">Ziyad Khan</span>
                </div>
                <div className="flex-row flex m-0">
                    <span className="text-sm">Score: 1025</span>
                </div>
            </div>
        </div>
    )
}

export { PlayerIndividualCard }