import React, {memo, useEffect, useState} from 'react';

import Loader from '../../Loaders/Loader';
import styles from './Button.module.css';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const CVDownloader: React.FC<ButtonProps> = memo(({onClick}) => {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDFServer = async () => {
        setIsLoading(true);
        document.body.classList.add('generate-pdf');

        try {
            const response = await fetch('/api/generate-pdf?path=/');

            if (!response.ok) {
                console.error('Error al generar el PDF:', response.status);
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = `KevinCandiaCV-${new Date().getFullYear()}.pdf`;

            document.body.appendChild(a);

            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        } finally {
            setIsLoading(false);
            document.body.classList.remove('generate-pdf');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.hash === '#download-cv') {
                generatePDFServer();

                window.history.replaceState(
                    null, 
                    document.title, 
                    window.location.pathname + window.location.search
                );
            }
        }
    }, [generatePDFServer]);

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            generatePDFServer();
        }
    };

    return (
        <button 
            className={`${styles.button} flex items-center justify-center min-w-[160px] min-h-[40px] px-6 py-2`}
            disabled={isLoading}
            id="generatePdfButton"
            onClick={handleClick}
        >
            <div className="flex items-center justify-center w-full h-full">
                {isLoading ? (
                    <Loader className="my-2" />
                ) : (
                    <span className={styles.button_cv}>Descargar CV</span>
                )}
            </div>
        </button>
    );
});

export default CVDownloader;