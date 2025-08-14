
import { useEffect } from "react";
interface NavigationGuardProps {
    isAllowed: boolean;
    children: React.ReactNode;
}

const NavigationGuard:React.FC<NavigationGuardProps> = ({ isAllowed, children }) => {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isAllowed) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isAllowed]);
    
    return (
        <>
            {children}
        </>
    );
}
 
export default NavigationGuard;