import Image from "next/image";

export default function Loading(){
    return (
        <div className="flex flex-col items-center justify-center">
            <Image src="/loading.svg" alt="Logo" width={200} height={200} className=" rounded-md shadow-sm hover:scale-110  transition-all ease-linear duration-300 " />
        </div>
    )
}