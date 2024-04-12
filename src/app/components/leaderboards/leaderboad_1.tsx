'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function Leaderboard1() {
    const [data, setData] = useState<any>([])
    const supabase = createClient()
    useEffect(() => {
        const fetchData = async () => {
            const { data: lb1Data, error: fetchError } = await supabase.from('Leaderboard_Image_1').select('*').order('seconds', { ascending: true })
            setData(lb1Data)
        }
        fetchData()
        return () => setData([])
    }, [])
    return (
        <div className=" p-4">
            <h1 className="text-3xl font-bold mt-4">Naval</h1>
            <table className="table-auto w-[50vw] border-collapse" style={{marginTop: "6px"}}>
                <thead>
                    <tr style={{ border: "2px solid red" }}>
                        <th className="p-2">Rank</th>
                        <th className="p-2">Player</th>
                        <th className="p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d: any, i: number) => (
                        <tr key={i} className="border-black border-solid" style={{ borderBottomWidth: '0.1px' }}>
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