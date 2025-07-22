import { useState, useEffect } from "react";

const useModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflowY = showModal ? 'hidden' : 'scroll';
    }, [showModal]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return { openModal, closeModal, showModal };
}
 
export default useModal;