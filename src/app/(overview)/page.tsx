'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const supabase = createClient()
  const [files, setFiles] = useState<File[]>([])
  const [loading , setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetch = async () => {
      const { data: images, error } = await supabase
        .storage
        .from('images')
        .list()
      if (error) {
        console.log(error)
        return
      }
      if (images) {
        for (let i = 0; i < images.length; i++) {
          const { data, error } = await supabase.storage.from('images').download(images[i].name)
          setFiles(prevFiles => [...prevFiles, data as File])
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      }
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
          files.map((file: File) => {
            return (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold my-4">{file.name}</h1>
                <Image src={URL.createObjectURL(file)} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
                <Link href="/waldo1" className="">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Play
                  </button>
                </Link>
              </div>
            )
          })
      }
    </>
  );
}
