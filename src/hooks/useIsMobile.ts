import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.addEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}