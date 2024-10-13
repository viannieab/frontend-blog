import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TopLoadingLine(){
    const router = useRouter()
    const [loadingProgress, setLoadingProgress] = useState(0)
    useEffect(() =>{
        const handleStart = () => {
            setLoadingProgress(80)
        }
        const handleComplete = () => {
            setLoadingProgress(100)
            setTimeout(() => {
                setLoadingProgress(0)
            }, 500)
        }
        //add event listiners
        router.events.on('hashChangeStart', handleStart)
        router.events.on('hashChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
        //clean up the event listiner
        return () => {
            router.events.off('hashChangeStart', handleStart)
            router.events.off('hashChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router.events])
    return(
        <>
            <div className="topLoadingLine"
                style={{width: `${loadingProgress}%`}}
            >
            </div>
        </>
    )
}