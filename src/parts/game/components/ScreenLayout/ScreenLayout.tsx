import styles from './ScreenLayout.module.scss'
import { CSSProperties, ReactNode } from 'react';

interface IProps {
    stylesValue?: CSSProperties;
    children: ReactNode;
}

const ScreenLayout = ({stylesValue, children}: IProps) => {
    return (
        <div className={styles.container} style={stylesValue}>
            {children}
        </div>
    );
};

export default ScreenLayout;