import style from "./style.module.css"
import logo from "@/assets/logo-dark.png"
import { cn } from "@/lib/utils"
import Image from 'next/image'

const IntroImage = () => {
    return (
        <button type="button" className={cn(style.box)}>
            <Image src={logo} alt="logo" className="bg-emerald- absolute h-[98%] w-[98%]" />
        </button>
    )
}

export default IntroImage