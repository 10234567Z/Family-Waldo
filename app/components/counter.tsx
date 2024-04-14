'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Counter({ player_name , stop , image_no}: { player_name: string , stop: boolean , image_no: number}) {
    const [second, setSecond] = useState<number>(0);
    const supabase = createClient()

    useEffect(() => {
        if(stop === false){
            const interval = setInterval(async() => {
                const { data , error } = await supabase.from(`current_session_${image_no}`).select('seconds').eq('player_name', player_name)
                const seconds = data?.[0].seconds
                const { error: updateError } = await supabase.from(`current_session_${image_no}`).update({ seconds: seconds + 1 }).eq('player_name', player_name)
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [stop])

    useEffect(() => { 
        if(stop === false){
            const interval = setInterval(() => {
                setSecond((prev) => prev + 1)
            } , 1000)
            return () => clearInterval(interval)
        }
    } , [stop])

    return (
        <div className="w-[50px]">
            <h1 className=" text-lg p-4 " >{second}</h1>
        </div>
    )
}