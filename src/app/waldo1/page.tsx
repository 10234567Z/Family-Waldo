'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import Counter from "../components/counter";

export default function Home() {
    const [image, setImage] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [coords, setCoords] = useState<{ x: string, y: string, visible: boolean }>({ x: '0px', y: '0px', visible: false });
    const supabase = createClient();
    useEffect(() => {
        const fetchImage = async () => {
            const { data: imageBlob, error } = await supabase.storage.from('images').download('waldo-p1.jpg');
            if (error) {
                console.error(error);
                return;
            }

            const { data: insertedRow, error: insertError } = await supabase
                .from('current_session')
                .insert([
                    { no_of_chars: 3, character_completed: [], image_no: 1 },
                ])
                .select()

            setImage(imageBlob);
            setIsLoading(false);
        };
        fetchImage();
        return () => {
            const cleanup = async () => {
                const { error: deleteError } = await supabase.from('current_session').delete().eq('image_no', 1);
            }
            cleanup()
        }
    }, []);

    const handleImgHover: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();

        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
        if (coords.visible) {
            setCoords({ x: '0px', y: '0px', visible: false })
        }
    }

    const handleClick: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        setCoords({ x: `${e.clientX - 24}px`, y: `${e.clientY - 24}px`, visible: true })
    }
    const handleWaldoClick: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

    }
    const handleWilmaClick: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

    }
    const handleWizardClick: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

    }
    return (
        <>
            <div className="flex flex-row items-center justify-center gap-1 " style={{ position: 'absolute', top: `${coords.y}`, left: `${coords.x}`, visibility: coords.visible ? 'visible' : 'hidden' }}>
                <div className=" border-4 rounded-md border-yellow-400 w-12 h-12 shadow-md" />
                <div className="grid grid-rows-half grid-flow-col place-items-center gap-1">
                    <Image src='/waldo.png' alt="Logo" width={30} height={30} className=" rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleWaldoClick}/>
                    <Image src='/wilma.png' alt="Logo" width={30} height={30} className="rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black"  onClick={handleWilmaClick}/>
                    <Image src='/wizard.jpg' alt="Logo" width={30} height={30} className=" rounded-sm w-[30px] h-[30px] cursor-pointer border-2 border-black" onClick={handleWizardClick}/>
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
                            <Counter image_no={1} />
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/waldo.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>Waldo</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wilma.png" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>Wilma</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/wizard.jpg" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>Wizard</h4>
                            </div>
                        </div>
                        <Image onMouseMove={handleImgHover} onClick={handleClick} src={image ? URL.createObjectURL(image) : ''} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                    </div>
            }
        </>
    )
}