
import { useContext, useState } from "react";
import { useFormik } from "formik"
import { SocketContext } from "../../Context/SocketContext";
export const GameSettingsModal = ({ onSubmit, onClose }) => {
    const handleWordChange = (index, value) => {
        const newWords = [...customWords];
        newWords[index] = value;
        setCustomWords(newWords);
    };
    const { socketRef } = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            numPlayers,
            drawTime,
            rounds,
            customWords: customWords.filter((w) => w.trim() !== ""),
        });
    };

    const formik = useFormik({
        initialValues: {
            numPlayers: 2,
            drawTime: 60,
            rounds: 3,
            customWords: ""
        },
        validate: (data) => {
            const errors = {}
            if (!data.numPlayers) {
                errors.numPlayers = "Please enter number of players"
            }
            if (!data.drawTime) {
                errors.drawTime = "Please enter a time limit."
            }
            if (!data.rounds) {
                errors.rounds = "Please enter number of rounds"
            }
            return errors;
        },
        onSubmit: (data) => {
            if(socketRef.current){
                socketRef.current.emit('updateGameSettings' , data)
            }
        }
    })

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Game Settings</h2>
                <form className="flex flex-col space-y-4" onSubmit={formik.handleSubmit}>

                    {/* Number of Players */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Number of Players</label>
                        <input
                            type="number"
                            min={2}
                            max={12}
                            value={formik.values.numPlayers}
                            name="numPlayers"
                            onChange={formik.handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Drawing Time */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Drawing Time (seconds)</label>
                        <input
                            type="number"
                            min={10}
                            max={180}
                            value={formik.values.drawTime}
                            onChange={formik.handleChange}
                            name="drawTime"

                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Number of Rounds */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Number of Rounds</label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={formik.values.rounds}
                            onChange={formik.handleChange}
                            name="rounds"

                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Custom Words */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Custom Words</label>
                        <input
                            type="text"
                            value={formik.values.customWords}
                            onChange={formik.handleChange}
                            placeholder="Enter a custom word"
                            name="customWords"

                            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
            
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Start Game
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
