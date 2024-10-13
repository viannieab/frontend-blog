import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa6"

export default function ScrollToTopBtn(){
    const [isVisible, setIsVisible] = useState()
    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const handleScroll = () => {
        if(window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }
    //scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
    return(
        <>
            <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={ScrollToTop}>
                <FaArrowUp/>
            </button>
        </>
    )
}