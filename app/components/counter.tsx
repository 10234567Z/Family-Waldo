'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Counter({ image_no , stop}: { image_no: number , stop: boolean}) {
    const [second, setSecond] = useState<number>(0);
    const supabase = createClient()

    useEffect(() => {
        if(stop === false){
            const interval = setInterval(async() => {
                const { data , error } = await supabase.from('current_session').select('seconds').eq('image_no', image_no)
                const seconds = data?.[0].seconds
                const { error: updateError } = await supabase.from('current_session').update({ seconds: seconds + 1 }).eq('image_no', image_no)
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