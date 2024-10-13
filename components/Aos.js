import { AOS } from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'

export default function Aos({ children }) {
    useEffect(() => {
        AOS.init({
            //global settings for aos animation
            duration: 1000,
            offset: 200,
            easing: 'ease',
            once: true,
        })
    }, [])

    return <div>{children}</div>
}
