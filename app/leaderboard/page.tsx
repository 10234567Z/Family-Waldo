'use client'
import { use, useEffect, useState } from "react"
import Leaderboard1 from "../components/leaderboards/leaderboad_1"
import Leaderboard2 from "../components/leaderboards/leaderboard_2"
import Leaderboard3 from "../components/leaderboards/leaderboard_3"
import PlayerCheck from "../components/playerChecker"

export default function Home() {
    const [lb1, setlb1] = useState<boolean>(true)
    const [lb2, setlb2] = useState<boolean>(false)
    const [lb3, setlb3] = useState<boolean>(false)
    useEffect(() => {
        PlayerCheck()
    })
    return (
        <>
            <div className="flex flex-row items-center justify-center gap-5 w-5/6">
                <button onClick={() => { setlb1(true); setlb2(false); setlb3(false) }} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">Naval</button>
                <button onClick={() => { setlb1(false); setlb2(true); setlb3(false) }} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">Warground</button>
                <button onClick={() => { setlb1(false); setlb2(false); setlb3(true) }} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">Zootopia</button>
            </div>
            {lb1 && <Leaderboard1/>}
            {lb2 && <Leaderboard2/>}
            {lb3 && <Leaderboard3/>}
        </>
    )
}