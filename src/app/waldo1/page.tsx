'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true)
    const [image, setImage] = useState<File>(new Blob as unknown as File)
    const supabase = createClient()
    useEffect(() => {
        const fetch = async () => {
            const { data: images, error } = await supabase
                .storage
                .from('images')
                .download('waldo-p1.jpg')
            setImage(images as File)
            setLoading(false)
        }
        fetch()
    }, [])
    return (
        <>
            {
                loading
                    ?
                    <div className="flex flex-col items-center justify-center">            
                        <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
                    </div>
                    :
                    <Image src={URL.createObjectURL(image)} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm w-[100%]" />
                }
        </>
    )
}