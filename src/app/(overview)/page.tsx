'use client'
import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = async () => {
  const supabase = createClient()
  const { data: images, error } = await supabase
    .storage
    .from('images')
    .list()

  if (error) throw error

  const files = []
  if (images) {
    for (let i = 0; i < images.length; i++) {
      const { data, error } = await supabase.storage.from('images').download(images[i].name)
      if (error) throw error
      files.push(data)
    }
  }

  return files
}

export default function Home() {
  const { data: files, error, isLoading } = useSWR('fetchImages', fetcher)

  if (error) return <div>{error}</div>
  if (!files) return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
    </div>
  )
  return (
    <>
      {
        files.map((file, index) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <Image src={URL.createObjectURL(file)} alt="Logo" width={320} height={400} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
              <Link href={`waldo${index + 1}`} className="">
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
