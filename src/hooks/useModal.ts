import { useState, useEffect } from "react";

const useModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (showModal) {
            const scrollY = window.scrollY;
            body.style.position = "fixed";
            body.style.top = `-${scrollY}px`;
            body.style.left = "0";
            body.style.right = "0";
            body.style.overflowY = "hidden";
            html.style.overflowY = "hidden";
        } else {
            const scrollY = Math.abs(parseInt(body.style.top || "0", 10));
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.overflowY = "auto";
            html.style.overflowY = "auto";
            window.scrollTo(0, scrollY);
        }
        return () => {
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.overflowY = "auto";
            html.style.overflowY = "auto";
        };
    }, [showModal]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return { openModal, closeModal, showModal };
}
 
export default useModal;