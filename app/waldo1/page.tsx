'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import Counter from "../components/counter";
import { navigate } from "../components/redirectAction";
import PlayerCheck from "../components/playerChecker";

export default function Home() {
    const [image, setImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [foundWaldo, setFoundWaldo] = useState<boolean>(false);
    const [foundWilma, setFoundWilma] = useState<boolean>(false);
    const [foundWizard, setFoundWizard] = useState<boolean>(false);
    const [coords, setCoords] = useState<{ x: string, y: string, visible: boolean }>({ x: '-10000px', y: '-10000px', visible: false });
    const [percentage, setPercentage] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [again, setAgain] = useState<boolean>(false)
    const [initial, setInitial] = useState<boolean>(true)
    const [playerName, setPlayerName] = useState<string>("")
    const [stop, setStop] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const supabase = createClient();

    const FinishGame = async() => {
        const { data: sessionData, error: fetchError } = await supabase.from('current_session_1').select('seconds').eq('player_name', playerName)
        const seconds = sessionData?.[0].seconds
        const { data, error } = await supabase.from('Leaderboard_Image_1').insert([{ name: playerName, seconds: seconds }])
        navigate()
    }
    useEffect(() => {
        const fetchImage = async () => {
            const { data: imageBlob, error } = await supabase.storage.from('images').download('waldo-p1.jpg');
            PlayerCheck()
            if (error) {
                console.error(error);
                return;
            }

            setImage(URL.createObjectURL(imageBlob));
        };
        fetchImage();
    }, []);

    const handleImgHover: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (coords.visible) {
            setCoords({ x: '-10000px', y: '-10000px', visible: false })
        }
        if (again) {
            setAgain(false)
        }
    }

    const handleClick: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();

        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
        setPercentage({ x, y });
        setCoords({ x: `${e.clientX - 30}px`, y: `${e.clientY - 30}px`, visible: true })
    }
    const handleSubmit: MouseEventHandler<HTMLButtonElement> | undefined = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { data: insertedRow, error: insertError } = await supabase
            .from('current_session_1')
            .insert([
                { no_of_chars: 3, character_completed: [], image_no: 1, player_name: playerName },
            ])
            .select()
        if(insertError){
            setError(true)}
        else{
            setStop(false)
            setInitial(false)
            setIsLoading(false);
            localStorage.setItem('player', playerName)
            localStorage.setItem('image_no', '1')
        }
    }

    /** 
     * Handle character choosen clicks
     * 
     */
    const handleWaldoClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: waldoData, error } = await supabase.from('image_1').select().eq('name', 'waldo');
        const X_CP = waldoData?.[0]?.X_Coords;
        const Y_CP = waldoData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWizard) arr.push('wizard')
        if (foundWilma) arr.push('wilma')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('waldo')
            const { error: updateError } = await supabase.from('current_session_1').update({ character_completed: arr }).eq('player_name', playerName);
            setFoundWaldo(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session_1').select().eq('player_name', playerName);
        if (currentSessionData?.[0]?.character_completed?.length === 3) {
            setStop(true)
            FinishGame()
        }
    }
    const handleWilmaClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: wilmaData, error } = await supabase.from('image_1').select().eq('name', 'wilma');
        const X_CP = wilmaData?.[0]?.X_Coords;
        const Y_CP = wilmaData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWaldo) arr.push('waldo')
        if (foundWizard) arr.push('wizard')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('wilma')
            const { error: updateError } = await supabase.from('current_session_1').update({ character_completed: arr }).eq('player_name', playerName);
            setFoundWilma(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session_1').select().eq('player_name', playerName);
        if (currentSessionData?.[0]?.character_completed?.length === 3) {
            setStop(true)
            FinishGame()
        }
    }
    const handleWizardClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: wizardData, error } = await supabase.from('image_1').select().eq('name', 'wizard');
        const X_CP = wizardData?.[0]?.X_Coords;
        const Y_CP = wizardData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWaldo) arr.push('waldo')
        if (foundWilma) arr.push('wilma')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('wizard')
            const { error: updateError } = await supabase.from('current_session_1').update({ character_completed: arr }).eq('player_name', playerName);
            setFoundWizard(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session_1').select().eq('player_name', playerName);
        if (currentSessionData?.[0]?.character_completed?.length === 3) {
            setStop(true)
            FinishGame()
        }
    }
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 gap-2  p-2  z-50 flex flex-col items-center justify-center rounded-sm translate-x-4 transition-all" style={{ display: initial ? "flex" : "none", transform: initial ? "translateX(0)" : "translateX(1rem)" }}>
                <h1 className="text-2xl text-white">Type your name here..</h1>
                <input type="text" placeholder="Enter your name" className="p-2 rounded-md text-black" onChange={(e) => setPlayerName(e.target.value)} value={playerName} required />
                <p style={{display: error? 'block' : 'none' , color: 'white'}}>Choose a different name</p>
                <button className="p-2 bg-green-500 text-white rounded-md" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="absolute top-0 left-[40%] bg-red-600 p-2  z-50 flex flex-col items-center justify-center rounded-sm" style={{ display: again ? "flex" : "none" }}>
                <h1 className="text-3xl text-white">Try Again</h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-1 p-0.5" style={{ position: 'absolute', top: `${coords.y}`, left: `${coords.x}`, visibility: coords.visible ? 'visible' : 'hidden' }}>
                <div className=" border-4 rounded-md border-yellow-400 w-12 h-12 shadow-md" />
                <div className="grid grid-rows-half grid-flow-col place-items-center gap-1">
                    <Image src='/waldo.png' alt="Logo" width={30} height={30} className=" rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleWaldoClick} style={{ display: foundWaldo ? "none" : "block" }} />
                    <Image src='/wilma.png' alt="Logo" width={30} height={30} className="rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleWilmaClick} style={{ display: foundWilma ? "none" : "block" }} />
                    <Image src='/wizard.jpg' alt="Logo" width={30} height={30} className=" rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleWizardClick} style={{ display: foundWizard ? "none" : "block" }} />
                </div>
            </div>
            {
                isLoading
                    ?
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
                    </div>
                    :
                    <div className="flex flex-col items-center justify-start gap-5 w-5/6">
                        <div className="flex flex-row justify-start items-center  w-[100%] bg-black text-white rounded-lg  p-4 gap-4 ">
                            <Counter image_no={1} player_name={playerName} stop={stop} />
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/waldo.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWaldo ? "*Found*" : "Waldo"}</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wilma.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWilma ? "*Found*" : "Wilma"}</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wizard.jpg" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWizard ? "*Found*" : "Wizard"}</h4>
                            </div>
                        </div>
                        <Image onMouseMove={handleImgHover} onClick={handleClick} src={image} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                    </div>
            }
        </>
    )
}