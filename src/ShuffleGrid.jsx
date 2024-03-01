import React, { useEffect, useRef, useState } from 'react'
import { squareData } from './constants';
import {motion} from 'framer-motion'

const ShuffleGrid = () => {

    const shuffle = (array) => {
        let currentIndex = array.length, 
            randomIndex;

        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

    // public static void shuffle(int[] array) {
    //     int currentIndex = array.length;
    //     Random random = new Random();
    //     int randomIndex;

    //     while (currentIndex != 0) {
    //         randomIndex = random.nextInt(currentIndex);
    //         currentIndex--;

    //         // Swap array[currentIndex] and array[randomIndex]
    //         int temp = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temp;
    //     }
    // }

    const generateSquares = () => {
        return shuffle(squareData).map((data) => (
            <motion.div
                key={data.id}
                layout
                transition={{
                    duration: 1.5,
                    type: "spring"
                }}
                className='square-image'
                style={{
                    backgroundImage: `url(${data.src})`,
                    backgroundSize: 'cover'
                }}
            >
            </motion.div>
        ))
    }

    const [squares, setSquares] = useState(generateSquares());
    const dataRef = useRef(null);

    const shuffleSquares = () => {
        setSquares(generateSquares());

        dataRef.current = setTimeout(() => {
            shuffleSquares
        }, 3000);
    }

    useEffect(()=> {
        shuffleSquares();
        return ()=> clearTimeout(dataRef.current);
    }, []);

    return (
        <div className='main-grid'>
            {squares.map((data) => data)}
        </div>
    )
}

export default ShuffleGrid