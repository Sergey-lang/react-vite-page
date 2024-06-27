import styles from './CircleCell.module.scss'
import { CSSProperties } from 'react';

interface IProps {
    id: string;
    stylesValue?: { boxWrapper?: CSSProperties, box?: CSSProperties };
    value: string;
    selected: boolean;
}

export const CircleCell = ({id, value, stylesValue, selected}: IProps) => {
    return (
        <div
            id={id}
            data-id={value}
            className={`${styles.box} ${selected ? styles.selected : ''}`}
            style={stylesValue?.box}
            draggable={'true'}
        >
            {value}
        </div>
    );
};