import Image from "next/image"

export default function TechniqueCard({ image, name }: any) {
    return (
        <li className="flex flex-col justify-between">
            <p className="text-center flex-1 align-middle">{name}</p>
            <Image src={image} alt={name} />
        </li>
    )
}
