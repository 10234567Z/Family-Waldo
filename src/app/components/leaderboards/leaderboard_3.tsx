'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function Leaderboard1(){
    const [data , setData ] = useState<any>([])
    const supabase = createClient()
    useEffect(()=> {
        const fetchData = async () => {
            const { data: lb3Data , error: fetchError } = await supabase.from('Leaderboard_Image_3').select('*').order('seconds' , {ascending: true})
            setData(lb3Data)
        }
        fetchData()
        return () => setData([])
    } , [])
    return (
        <div className=" p-4">
            <h1 className="text-3xl font-bold mt-4">Zootopia</h1>
            <table className="table-auto w-[50vw] border-collapse">
                <thead>
                    <tr className="border-black border-solid" style={{ borderBottomWidth: '4px'}}>
                        <th className="p-2">Rank</th>
                        <th className="p-2">Player</th>
                        <th className="p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d:any , i:number) => (
                        <tr key={i} className="border-black border-solid" style={{ borderBottomWidth: '0.1px'}}>
                            <td className="p-2">{i + 1}</td>
                            <td className="p-2">{d.name}</td>
                            <td className="p-2">{d.seconds}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}   