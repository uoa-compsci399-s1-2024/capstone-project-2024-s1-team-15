import React from "react"
import Link from "next/link"
import Button, { ButtonProps } from "@/app/components/Button";

type ButtonLinkProps = ButtonProps & { href: string }

export default function ButtonLink(props: ButtonLinkProps ): React.JSX.Element {
    return (
        <Link href={props.href} className={"text-black block"}>
            <Button {...props}/>
        </Link>
    )
}
