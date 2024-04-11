'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Counter({ image_no }: { image_no: number }) {
    const [second, setSecond] = useState<number>(0);
    const supabase = createClient()

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond(prev => prev + 1);
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const updateSecond = async () => {
            const { error } = await supabase.from('current_session').update({ seconds: second }).eq('image_no', image_no)
            if (error) {
                console.error(error);
            }
        }
        updateSecond();
    }, [second])

    return (
        <div className="w-[50px]">
            <h1 className=" text-lg p-4 " >{second}</h1>
        </div>
    )
}