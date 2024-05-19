import { LoginForm } from "@/app/(auth)/components"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"

type LoginModalProps = {
    modalId?: string
}

export type LoginModalRef = {
    showModal: () => void
}

const LoginModal = forwardRef(
    function LoginModal({ modalId = "default-login-modal" }: LoginModalProps, ref: ForwardedRef<LoginModalRef>) {
        const [ hidden, setHidden ] = useState(true)

        const showModal = () => {
            setHidden(false)
        }

        useImperativeHandle(ref, () => ({ showModal }))

        useEffect(() => {
            const s = document.getElementById(modalId)
            if (!s) return
            s.addEventListener("click", () => {
                const modal = document.getElementById(`inner-${modalId}`)
                if (!modal) return
                if (!modal.matches(":hover")) {
                    setHidden(true)
                }
            })  // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <div id={modalId} tabIndex={-1} className={`${hidden? "hidden" : ""} outer-modal`}>
                <div id={`inner-${modalId}`} className={"inner-modal"}>
                    <div className={"relative flex flex-row bg-white p-4 pb-3 sm:p-5 md:p-6 md:pb-4 rounded-t-2xl items-center"}>
                        <p className={"text-xl sm:text-[22px] md:text-2xl font-bold grow ml-2"}>Login</p>
                        <button className={"button w-12 h-12 grow-0"} onClick={() => setHidden(true)}>
                            <svg className={"w-3 h-3"} aria-hidden={"true"} xmlns={"http://www.w3.org/2000/svg"}
                                 fill={"none"} viewBox={"0 0 14 14"}>
                                <path stroke="currentColor" strokeLinecap={"round"} strokeLinejoin={"round"}
                                      strokeWidth={"2"} d={"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"}/>
                            </svg>
                        </button>
                    </div>
                    <div className={"relative bg-white p-4 sm:p-5 md:p-6 rounded-b-2xl"}>
                        <LoginForm closeModal={() => setHidden(true)}/>
                    </div>
                </div>
            </div>
        )
    }
)

export default LoginModal
