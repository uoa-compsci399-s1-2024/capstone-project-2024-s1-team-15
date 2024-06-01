import Image from "next/image"
import { Strategy } from "@/app/(content)/health/content/commonStrategies"
import DialogModal from "@/app/components/modals/DialogModal"
import { useRef } from "react"
import { ModalRef } from "@/app/lib/hooks/useModal"

export default function StrategyCard({ strategy: { image, title, dialogContent } }: { strategy: Strategy }) {
    const dialogModalRef = useRef<ModalRef>(null)

    return (
        <>
            {dialogContent &&
                <DialogModal id={title.split(" ").join("-")} ref={dialogModalRef}>
                    <div className={"prose"}>
                        {dialogContent}
                    </div>
                </DialogModal>
            }
            <div
                className={`basis-64 sm:basis-72 md:basis-80 flex flex-col items-center ${dialogContent ? "cursor-pointer" : ""}`}
                onClick={() => dialogModalRef.current && dialogModalRef.current.showModal()}
            >
                <p className="text-center align-middle bg-primary-light rounded-full py-4 w-full">{title}</p>
                <Image src={image} alt={title} className="max-w-[70%]"/>
            </div>
        </>
    )
}
