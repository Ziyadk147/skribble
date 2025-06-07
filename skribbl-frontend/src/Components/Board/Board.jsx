import { useEffect, useRef } from "react"

const Board = ()  => {
    const canvasRef = useRef(null);


    useEffect(() => {
        //drawing states
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0
        const startDrawing = (event) => {
            isDrawing = true;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const rect = event.target.getBoundingClientRect(); //getBoundingClientRect() returns an object like { left, top, width, height, ... }
            lastX = event.clientX - rect.left;
            lastY = event.clientY - rect.top;
            //clientX and clientY are mouse coordinates relative to the screen and by subtracting the left and top we get the position inside the canvas/
            context.beginPath(); //reset the coordinates on each stroke
            context.moveTo(lastX, lastY)

        }

        const draw = (event) => {
            if(!isDrawing){
                return ; 
            }
            const canvas = canvasRef.current;// getcanvas
            const context = canvas.getContext('2d'); //get drawing context
            if(!canvas || !context ) return ; //if any of them missing, return nothign;

            const rect = event.target.getBoundingClientRect();

            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            context.lineTo(offsetX ,offsetY);

            context.stroke();

            lastX = offsetX;
            lastY = offsetY;
        }
        const endDrawing = () => {
            isDrawing = false;
        };
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(canvas && context){
            context.strokeStyle = 'black';
            context.lineWidth = 5;
            context.linecap = 'round';


            canvas.addEventListener('mousedown' , startDrawing);
            canvas.addEventListener('mousemove' , draw);
            canvas.addEventListener('mouseup' , endDrawing);
            canvas.addEventListener('mouseout' , endDrawing);
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', startDrawing);
                canvas.removeEventListener('mousemove', draw);
                canvas.removeEventListener('mouseup', endDrawing);
                canvas.removeEventListener('mouseout', endDrawing);
            }
        }
    } , [])

    return (
        <div className="flex flex-col justify-center py-4 w-full items-center">
            <canvas
                ref={canvasRef}
                width={1500}
                height={600}
                className="bg-white"
            >   
            </canvas>
        </div>

    )
}


export {Board}