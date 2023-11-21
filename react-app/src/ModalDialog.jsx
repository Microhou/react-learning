import { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
export default function ModalDialog({ isOpen, children }) {
    const ref = useRef();
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const dialog = ref.current
        dialog.showModal();
        console.log(dialog)
        return () => {
            dialog.close();
          };
    }, [isOpen])

    return <dialog ref={ref}>{children}</dialog>;
}