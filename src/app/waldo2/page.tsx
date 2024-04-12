'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import Counter from "../components/counter";
import { redirect } from "next/navigation";
import { navigate } from "../components/redirectAction";

export default function Home() {
    const [image, setImage] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [foundWaldo, setFoundWaldo] = useState<boolean>(false);
    const [foundWilma, setFoundWilma] = useState<boolean>(false);
    const [foundWizard, setFoundWizard] = useState<boolean>(false);
    const [foundOdlaw, setFoundOdlaw] = useState<boolean>(false);
    const [coords, setCoords] = useState<{ x: string, y: string, visible: boolean }>({ x: '-10000px', y: '-10000px', visible: false });
    const [percentage, setPercentage] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [again, setAgain] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [playerName , setPlayerName] = useState<string>("")
    const [stop , setStop] = useState<boolean>(false)

    const supabase = createClient();
    useEffect(() => {
        const fetchImage = async () => {
            const { data: imageBlob, error } = await supabase.storage.from('images').download('waldo-p2.jpg');
            if (error) {
                console.error(error);
                return;
            }

            const { data: insertedRow, error: insertError } = await supabase
                .from('current_session')
                .insert([
                    { no_of_chars: 4, character_completed: [], image_no: 2 },
                ])
                .select()

            setImage(imageBlob);
            setIsLoading(false);
        };
        fetchImage();
        return () => {
            const cleanup = async () => {
                const { error: deleteError } = await supabase.from('current_session').delete().eq('image_no', 2);
            }
            cleanup()
        }
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

    const handleSubmit: MouseEventHandler<HTMLButtonElement> | undefined = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { data: sessionData , error : fetchError } = await supabase.from('current_session').select('seconds').eq('image_no', 2)
        const seconds = sessionData?.[0].seconds
        const { data , error } = await supabase.from('Leaderboard_Image_2').insert([{ name: playerName , seconds: seconds}])
        navigate()
    }
    /** 
     *
     *  Handle character choosen clicks
     * 
     */
    const handleWaldoClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: waldoData, error } = await supabase.from('image_2').select().eq('name', 'waldo');
        const X_CP = waldoData?.[0]?.X_Coords;
        const Y_CP = waldoData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWizard) arr.push('wizard')
        if (foundWilma) arr.push('wilma')
        if (foundOdlaw) arr.push('odlaw')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('waldo')
            const { error: updateError } = await supabase.from('current_session').update({ character_completed: arr }).eq('image_no', 2);
            setFoundWaldo(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session').select().eq('image_no', 2);
        if (currentSessionData?.[0]?.character_completed?.length === 4) {
            setStop(true)
            setSuccess(true)
        }
    }
    const handleWilmaClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: wilmaData, error } = await supabase.from('image_2').select().eq('name', 'wilma');
        const X_CP = wilmaData?.[0]?.X_Coords;
        const Y_CP = wilmaData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWaldo) arr.push('waldo')
        if (foundWizard) arr.push('wizard')
        if (foundOdlaw) arr.push('odlaw')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('wilma')
            const { error: updateError } = await supabase.from('current_session').update({ character_completed: arr }).eq('image_no', 2);
            setFoundWilma(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session').select().eq('image_no', 2);
        if (currentSessionData?.[0]?.character_completed?.length === 4) {
            setStop(true)
            setSuccess(true)
        }
    }
    const handleWizardClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: wizardData, error } = await supabase.from('image_2').select().eq('name', 'wizard');
        const X_CP = wizardData?.[0]?.X_Coords;
        const Y_CP = wizardData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWaldo) arr.push('waldo')
        if (foundWilma) arr.push('wilma')
        if (foundOdlaw) arr.push('odlaw')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('wizard')
            const { error: updateError } = await supabase.from('current_session').update({ character_completed: arr }).eq('image_no', 2);
            setFoundWizard(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session').select().eq('image_no', 2);
        if (currentSessionData?.[0]?.character_completed?.length === 4) {
            setStop(true)
            setSuccess(true)
        }
    }

    const handleOdlawClick: MouseEventHandler<HTMLImageElement> | undefined = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const { data: odlawData, error } = await supabase.from('image_2').select().eq('name', 'odlaw');
        const X_CP = odlawData?.[0]?.X_Coords;
        const Y_CP = odlawData?.[0]?.Y_Coords;
        const arr: string[] = []
        if (foundWaldo) arr.push('waldo')
        if (foundWilma) arr.push('wilma')
        if (foundWizard) arr.push('wizard')
        if (X_CP.includes(percentage.x) && Y_CP.includes(percentage.y)) {
            arr.push('odlaw')
            const { error: updateError } = await supabase.from('current_session').update({ character_completed: arr }).eq('image_no', 2);
            setFoundOdlaw(true);
        }
        else {
            return (
                setAgain(true)
            )
        }
        const { data: currentSessionData, error: currentError } = await supabase.from('current_session').select().eq('image_no', 2);
        if (currentSessionData?.[0]?.character_completed?.length === 4) {
            setStop(true)
            setSuccess(true)
        }
    }


    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 gap-2  p-2  z-50 flex flex-col items-center justify-center rounded-sm translate-x-4 transition-all" style={{ display: success ? "flex" : "none" , transform: success ? "translateX(0)" : "translateX(1rem)"}}>
                <h1 className="text-2xl text-white">Congratz! You found all characters</h1>
                <input type="text" placeholder="Enter your name" className="p-2 rounded-md" onChange={(e) => setPlayerName(e.target.value)} value={playerName} required/>
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
                    <Image src='/odlaw.jpg' alt="Logo" width={30} height={30} className=" rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleOdlawClick} style={{ display: foundOdlaw ? "none" : "block" }} />
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
                            <Counter image_no={2} stop={stop} />
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/waldo.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWaldo ? "*found*" : "Waldo"}</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wilma.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWilma ? '*found*' : "Wilma"}</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wizard.jpg" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundWizard ? "*found*" : "Wizard"}</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/odlaw.jpg" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>{foundOdlaw ? "*found*" : "Odlaw"}</h4>
                            </div>
                        </div>
                        <Image onMouseMove={handleImgHover} onClick={handleClick} src={image ? URL.createObjectURL(image) : ''} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                    </div>
            }
        </>
    )
}