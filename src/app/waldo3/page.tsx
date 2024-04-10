'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MouseEventHandler } from "react";
import useSWR from "swr";

const fetcher = async() => {
    const supabase = createClient()
    const {data: image , error} = await supabase.storage.from('images').download('waldo-p3.jpg')
    return image
}

export default function Home() {
    const { data: image , error , isLoading} = useSWR('fetchImage', fetcher)
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
                    <Image onMouseMove={handleImgHover} src={image ? URL.createObjectURL(image) : ''} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                }
        </>
    )
}