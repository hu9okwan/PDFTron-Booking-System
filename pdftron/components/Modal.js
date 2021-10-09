import {useState, useEffect} from "react";
import styles from "../styles/Modal.Module.css";
import ReactDom from "react-dom";


export default function Modal({show, onClose, children}) {
    const [isBrowser, setIsBrowser] =useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <button className="btn">Close</button>
                    </a>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDom.createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    }
    else {
        return null;
    }
}
