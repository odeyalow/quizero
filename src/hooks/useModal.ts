import { useState } from "react";

const useModal = (type: 'confirm' | 'accept') => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return { openModal, closeModal, showModal };
}
 
export default useModal;