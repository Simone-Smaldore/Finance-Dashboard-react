// src/components/FullscreenSpinner.tsx
import React from "react";

export default function FullscreenSpinner() {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-trasparente
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

