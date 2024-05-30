import { useEffect, useRef } from "react"

export default function ExplanationDialog({ onClose, children: content }: any) {
    const ref = useRef<null | HTMLDialogElement>(null)

    useEffect(() => {
        if (!ref.current) return

        ref.current.showModal()
        document.documentElement.style.overflowY = "hidden"
    }, [content, ref])

    return (
        <dialog
            ref={ref}
            className="bg-green-200 p-4 rounded-lg fixed max-w-[50%] "
            onClick={(e) => {
                if (!ref.current) return

                const { left, right, top, bottom } = ref.current.getBoundingClientRect()

                if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
                    document.documentElement.style.overflowY = ""
                    ref.current.close()
                    onClose(e)
                }
            }}>
            {content}
        </dialog>
    )
}
