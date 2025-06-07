import { useEffect, useRef , useState } from "react"
import { Toolbar } from "../Toolbar/Toolbar";
import { io } from "socket.io-client";
const Board = ()  => {
    const canvasRef = useRef(null);

    const colors = ['black', 'red', 'blue', 'green', 'orange'];
    const [color, setColor] = useState('black');
    const [socket , setSocket ] = useState(null);

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:5000/');
        console.log(socketRef.current , "Connected to Socket");
        return () => {
            socketRef.current.disconnect();
        }
    } , []);


    useEffect(() => {
        if(socketRef.current) {
            const handleCanvasImage = (data) => {
                const image = new Image()
                image.src = data;

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                image.onload = () => {
                    // Clear canvas first
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // Now draw the new image (which might be empty if cleared)
                    context.drawImage(image, 0, 0);
                };
            }
            socketRef.current.on('canvasImage' ,handleCanvasImage);
            return () => {
                socketRef.current.off('canvasImage', handleCanvasImage)
            }
        }
    } , [socketRef.current])



    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);


    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };


        window.addEventListener('resize', handleWindowResize);


        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    const sendDataToSocket = (data) => {
        if(socketRef.current){
            socketRef.current.emit("canvasImage" , data);
            console.log("Data emitted")
        }
    }
    useEffect(() => {
        //drawing states
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if(!canvas || !context) return;

        context.strokeStyle = color;
        context.lineWidth = 5;
        context.linecap = "round";
        context.lineJoin = 'round';


        const getOffset = (clientX , clientY) => {
            const rect = canvas.getBoundingClientRect(); //getBoundingClientRect() returns an object like { left, top, width, height, ... }

            return {

                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        
        const startDrawing = (x , y) => {
            isDrawing = true;
            const {lastX , lastY} = getOffset(x , y);
            context.beginPath();
            context.moveTo(lastX , lastY); //reset the coordinates on each stroke
       

        }

        const draw = (x  ,  y) => {

            if(!isDrawing) return ;

            const position = getOffset(x , y); //get x and y coordinates
            context.lineTo(position.x , position.y); //draw a line to that coordinates
            context.stroke();
            
            lastX = position.x;
            lastY = position.y;
        
        }
        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataUrl = canvas.toDataURL();
            if(socketRef.current){
                socketRef.current.emit("canvasImage" , dataUrl);
                console.log("Drawing Ended")

            }
            // console.log(socket)
            isDrawing = false;


        };
     
        const handleMouseDown = (e) => startDrawing(e.clientX , e.clientY);
        const handleMouseMove = (e) => draw(e.clientX , e.clientY);
        const handleMouseUp = endDrawing;
        const handleMouseExit = endDrawing;


        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            startDrawing(touch.clientX , touch.clientY);
        }
        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            draw(touch.clientX , touch.clientY);
            e.preventDefault();
        }
        const handleTouchStop = endDrawing;


        canvas.addEventListener('mousedown' , handleMouseDown);
        canvas.addEventListener('mousemove' , handleMouseMove);
        canvas.addEventListener("mouseup" , handleMouseUp);
        canvas.addEventListener("mouseout" , handleMouseExit);


        canvas.addEventListener('touchstart' , handleTouchStart);
        canvas.addEventListener('touchmove' , handleTouchMove);
        canvas.addEventListener('touchend' , handleTouchStop);
        canvas.addEventListener('touchcancel' , handleTouchStop);
        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
                canvas.removeEventListener('mouseout', handleTouchStop);

                canvas.removeEventListener('touchstart', handleTouchStart);
                canvas.removeEventListener('touchmove', handleTouchMove);
                canvas.removeEventListener('touchend', handleTouchStop);
                canvas.removeEventListener('touchcancel', handleTouchStop);
            }
        }
    } , [color])

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0 ,  0 , 1500 , 600)
        sendDataToSocket(canvasRef.current.toDataURL())
    } 

    return (
        <div className="flex flex-col justify-center py-4 w-full items-center">
            <div className="flex flex-row">
                 <canvas
                    ref={canvasRef}
                    width={windowSize[0] > 600 ? 600 : 300}
                    height={windowSize[1] > 400 ? 400 : 200}
                    className="bg-white"
                />
            </div>
            <div className="flex flex-row w-full">
                <Toolbar 
                    clearCanvas={clearCanvas}
                    setColor={setColor}
                    color={color}
                    colors={colors}
                />
            </div>
            
        </div>

    )
}


export { Board }