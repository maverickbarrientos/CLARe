import { useContext } from "react";
import { QRCodeContext } from "../contexts/QRCodeContext";

export function useQRCode() {

    const context = useContext(QRCodeContext);

    if (!context) {
        throw new Error("QR Code context must be wrapped in a QRCodeProvider");
    }

    return context

}