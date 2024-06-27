import styles from './CellFields.module.scss'
import { CSSProperties } from 'react';
import CellFactory from '@components/Cell/CellFactory.tsx';
import { IPrintedObj } from '@components/Controls/Controls.tsx';

interface IProps {
    cellCount?: number,
    stylesProp?: CSSProperties,
    size: 'small' | 'big';
    values?: IPrintedObj;
}

const CellFields = ({size, stylesProp, values}: IProps) => {
    const getSortedWord = () => {
        if (!values) return
        const array = [...Object.values(values)];
        const sorted = array.sort((a, b) => a.order - b.order)
        return sorted
    }

    const word = getSortedWord();
    return (
        <div className={`${styles.cellWrapper}`} style={stylesProp}>
            {word?.map(({value, order}) => {
                return (
                    <CellFactory size={size} key={order} value={value}/>
                )
            })}
        </div>
    );
};

export default CellFields;