'use client'
import { useEffect, useState } from "react";

export default function Counter(){
    const [second, setSecond] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSecond(prev => prev + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-[50px]">
        <h1 className=" text-lg p-4 " >{second}</h1>
        </div>
    )
}