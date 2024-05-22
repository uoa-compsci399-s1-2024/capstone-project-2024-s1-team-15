import Image from "next/image"

export default function TechniqueCard({ image, name, explanation, onClick }: any) {
    return (
        <div
            className={`basis-64 sm:basis-72 md:basis-80 flex flex-col items-center ${explanation ? "cursor-pointer" : ""}`}
            onClick={(e) => explanation && onClick(e)}>
            <p className="text-center align-middle bg-primary-light rounded-full py-4 w-full">{name}</p>
            <Image src={image} alt={name} className="max-w-[70%]" />
        </div>
    )
}
