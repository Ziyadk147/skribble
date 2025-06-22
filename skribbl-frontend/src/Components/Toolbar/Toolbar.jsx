import { useState } from "react";
import { Colorpicker } from "../ColorPicker/ColorPicker";
const Toolbar = ({clearCanvas , colors, color , setColor}) => {
    
    return ( 
        <div className="flex flex-row justify-center items-baseline  w-full mt-2">
            <div className="flex flex-col ">
                <Colorpicker
                    color={color}
                    colors={colors}
                    setColor={setColor}

                />
            </div>
            <div className="flex flex-col mx-5">
                <button
                    className="bg-white p-2 "
                    onClick={clearCanvas}
                 >
                    Clear Board
                </button>
            </div>
        </div>
    )
}

export {Toolbar}