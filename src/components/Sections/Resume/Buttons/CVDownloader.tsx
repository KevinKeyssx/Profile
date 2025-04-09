import React, { useState } from 'react';
import styles from './Button.module.css';
import Loader from '../../Loaders/Loader';

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
}

const CVDownloader: React.FC<ButtonProps> = ({ onClick }) => {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDFServer = async () => {
        setIsLoading(true);
        document.body.classList.add( 'generate-pdf' );

        try {
            const response = await fetch( '/api/generate-pdf?path=/' );

            if ( !response.ok ) {
                console.error( 'Error al generar el PDF:', response.status );
                return;
            }

            const blob  = await response.blob();
            const url   = window.URL.createObjectURL(blob);
            const a     = document.createElement('a');

            a.href      = url;
            a.download  = `KevinCandiaCV-${new Date().getFullYear()}.pdf`;

            document.body.appendChild( a );

            a.click();

            window.URL.revokeObjectURL( url );
            document.body.removeChild( a );
        } catch ( error ) {
            console.error('Error al generar el PDF:', error);
        } finally {
            setIsLoading( false );
            document.body.classList.remove( 'generate-pdf' );
        }
    };

    const handleClick = () => {
        if ( onClick ) {
            onClick();
        } else {
            generatePDFServer();
        }
    };

    return (
        <button 
            className   = { `${styles.button} flex items-center justify-center min-w-[160px] min-h-[40px] px-6 py-2`}
            onClick     = { handleClick }
            disabled    = { isLoading }
            id          = "generatePdfButton"
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
};

export default CVDownloader;