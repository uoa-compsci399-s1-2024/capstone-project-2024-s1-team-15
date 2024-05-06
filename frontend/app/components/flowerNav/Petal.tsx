import Image from "next/image"
import Link from "next/link"
import PetalImageFile from "./PetalImage.svg"
import Page from "@/app/type/PageType"

type Props = {
    page: Page
    selected?: boolean
}

function PetalImage() {
    return <Image src={PetalImageFile} alt="flower petal image" className="z-0 rotate-180 scale-125" />
}

export default function Petal({ page, selected }: Props) {
    return (
        <div className="w-64">
            {page && (
                <Link href={page.url} className="relative pointer-events-auto text-black">
                    <p
                        className={`z-10 absolute top-1/2 left-[35%] transform -translate-x-1/2 -translate-y-1/2 font-black ${selected ? "opacity-100" : "opacity-20"}`}>
                        {page.name}
                    </p>

                    <PetalImage />
                </Link>
            )}
        </div>
    )

    // <img  />
}
