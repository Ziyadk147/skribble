import { useState } from "react";

const Colorpicker = ({colors , color , setColor}) => {
    
    return (
         <div className="flex  mb-2 ">
                {colors && colors.map((c) => (
                    <div
                        key={c}
                        className={`w-6 h-6 rounded cursor-pointer border-2 ${
                            color === c ? 'border-black' : 'border-gray-400'
                        } hover:scale-110 transition-transform`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>
    )
}

export { Colorpicker };