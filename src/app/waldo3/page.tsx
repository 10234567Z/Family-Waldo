'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import Counter from "../components/counter";

export default function Home() {
    const [image, setImage] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const supabase = createClient();
    useEffect(() => {
        const fetchImage = async () => {
            const { data: imageBlob, error } = await supabase.storage.from('images').download('waldo-p3.jpg');
            if (error) {
                console.error(error);
                return;
            }
            setImage(imageBlob);
            setIsLoading(false);
        };
        fetchImage();
    }, []);

    const handleImgHover: MouseEventHandler<HTMLImageElement> | undefined = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();

        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    }


    return (
        <>
            {
                isLoading
                    ?
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
                    </div>
                    :
                    <div className="flex flex-col items-center justify-start gap-5 w-5/6">
                        <div className="flex flex-row justify-start items-center  w-[100%] bg-black text-white rounded-lg  p-4 gap-4 ">
                            <Counter/>
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
                            <div className="flex flex-col justify-center items-center">
                                <Image src="/odlaw.jpg" alt="Logo" width={60} height={60} className="w-[60px] h-[60px] rounded-sm" />
                                <h4>Odlaw</h4>
                            </div>
                        </div>
                        <Image onMouseMove={handleImgHover} src={image ? URL.createObjectURL(image) : ''} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                    </div>
            }
        </>
    )
}