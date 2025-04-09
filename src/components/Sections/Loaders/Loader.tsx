import React, {memo} from 'react';

import styles from './Loader.module.css';

interface LoaderProps {
    className?: string;
}

const Loader: React.FC<LoaderProps> = memo(({className}) => {
    return (
        <div className={`${styles.loaderBar} ${className || ''}`}></div>
    );
});

export default Loader;