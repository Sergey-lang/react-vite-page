import styles from './CellFields.module.scss'
import { CSSProperties } from 'react';
import CellFactory from '../Cell/CellFactory.tsx';
import { IPrintedObj } from '../types';

interface IProps <T> {
    cellCount?: number,
    stylesProp?: CSSProperties,
    size: 'small' | 'big';
    values?: T;
    guessedWords?: string[];
    isShowValue?: boolean;
}

const CellFields = <T,> ({size, stylesProp, values, guessedWords, isShowValue}: IProps<T>) => {
    const getSortedWord = (obj: IPrintedObj): { value: string; order: number }[] => {
        if (!obj) return []
        const array = [...Object.values(obj)];
        return array.sort((a, b) => a.order - b.order);
    }

    const isArray = Array.isArray(values);

    const words = isArray ? values : values ? getSortedWord(values) : [];

    return (
        <>
            {!isArray ? (
                <div className={`${styles.cellWrapper}`} style={stylesProp}>
                    {words?.map(({value}, idx) => {
                        const isShowSymbol = isShowValue !== undefined
                            ? isShowValue
                            : guessedWords && guessedWords.includes(value);
                        return <CellFactory size={size} key={idx} value={value} isShowSymbol={isShowSymbol}/>
                    })}
                </div>
            ) : (
                <>
                    {words?.map((word) => {
                        const isShowSymbol = isShowValue !== undefined
                            ? isShowValue
                            : guessedWords && guessedWords.includes(word);
                        const isGuessedWord = guessedWords && guessedWords.includes(word);
                        return (
                            <div key={word} className={`${styles.cellWrapper}`} style={stylesProp}>
                                {word.split('').map((letter: string, idx: number) => {
                                    return (
                                        <CellFactory
                                            size={size}
                                            key={idx}
                                            isShowSymbol={isShowSymbol}
                                            isGuessedWord={isGuessedWord}
                                            value={letter}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </>
            )}
        </>
    );
};

export default CellFields;