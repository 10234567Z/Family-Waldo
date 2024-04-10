'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [files, setFiles] = useState<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchImages = async () => {
      const { data: images, error: listError } = await supabase.storage.from('images').list();
      if (listError) {
        setError(listError.message);
        return;
      }

      const fetchedFiles: Blob[] = [];
      for (let i = 0; i < images.length; i++) {
        const { data, error: downloadError } = await supabase.storage.from('images').download(images[i].name);
        if (downloadError) {
          setError(downloadError.message);
          return;
        }
        fetchedFiles.push(data);
      }

      setFiles(fetchedFiles);
    };

    fetchImages();

    // Cleanup function
    return () => {
      setFiles([]);
    };
  }, []);

  if (error) return <div>{error}</div>
  if (!files.length) return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm transition-all ease-linear duration-300 " />
    </div>
  )
  return (
    <div className="grid grid-cols-auto-fit-300 place-items-center gap-5 w-5/6">
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
    </div>
  );
}