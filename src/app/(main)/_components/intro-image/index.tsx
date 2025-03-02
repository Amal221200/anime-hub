import style from "./intro-image.module.css"
import logo from "@/assets/logo-dark.svg"
import { cn } from "@/lib/utils"
import Image from 'next/image'

const IntroImage = () => {
    return (
        <button type="button" className={cn(style.box, "sm:scale-[0.8] scale-[0.6]")}>
            <div className="absolute h-[98%] w-[98%] rounded-[40px] bg-black">
                <Image src={logo} alt="logo" fill className="absolute h-full w-full" />
            </div>
        </button>
    )
}

export default IntroImage