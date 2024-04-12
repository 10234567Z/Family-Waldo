'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Counter({ image_no }: { image_no: number }) {
    const [second, setSecond] = useState<number>(0);
    const supabase = createClient()

    useEffect(() => {
        const interval = setInterval(async() => {
            const { data , error } = await supabase.from('current_session').select('seconds').eq('image_no', image_no)
            const seconds = data?.[0].seconds
            const { error: updateError } = await supabase.from('current_session').update({ seconds: seconds + 1 }).eq('image_no', image_no)
            setSecond(seconds + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="w-[50px]">
            <h1 className=" text-lg p-4 " >{second}</h1>
        </div>
    )
}