import Image from "next/image"

export default function TechniqueCard({ image, name }: any) {
    return (
        <li className="flex flex-col justify-between w-[30%] items-center">
            <p className="text-center align-middle bg-primary-light rounded-full p-4 w-full">{name}</p>
            <Image src={image} alt={name} className="max-w-[70%]" />
        </li>
    )
}
