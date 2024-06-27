import styles from './Controls.module.scss'
import { CircleCell } from '@components/Cell/CircleCell/CircleCell.tsx';
import { useEffect, useRef, useState } from 'react';

export interface IPrintedObj {
    [key: string]: { value: string, order: number };
}

interface IProps {
    value: string;
    setPrintedWord: (v: IPrintedObj) => void;
    setGuessedWords: (v: string) => void;
    printedWord: IPrintedObj;
}

const getWord = (wordObj: IPrintedObj) => {
    if (!wordObj) return
    const array = [...Object.values(wordObj)];
    const sorted = array.sort((a, b) => a.order - b.order)
    const wordsArr = sorted.map(({value}) => value);
    return wordsArr.join('');
}

const Controls = ({value = '', setPrintedWord, setGuessedWords, printedWord}: IProps) => {
    const [values, setValues] = useState<string[]>([])
    const idRef = useRef(0);

    const ref = useRef<HTMLDivElement | null>(null);

    const shuffleArray = (array: string[]): string[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    const getSymbolsFromWord = (srtValue: string): string[] => {
        const splitWord = srtValue.split('');
        return shuffleArray(splitWord)
    }

    const checkWord = (): boolean => {
        const word = getWord(printedWord);
        return word === value
    }

    useEffect(() => {
        if (!value) return;
        setValues(getSymbolsFromWord(value))
    }, [value])

    useEffect(() => {
        if (!ref.current) return;

        // add start value
        const mousedown = (event: any) => {
            const initId = idRef.current;
            const element = event.target;
            const dataId = element.dataset.id;
            if (!dataId) return;
            const uniqId = element.id;

            setPrintedWord({[uniqId]: {value: dataId, order: initId}});
        }


        const dragstart = (event: any) => {
            // const initId = idRef.current;
            // const element = event.target;
            // const dataId = element.dataset.id;
            // if (!dataId) return;
            // const id = element.id;
            //
            // setPrintedWord(prev => ({...prev, [id]: {value: dataId, order: initId}}))
        }


        const dragenter = (event: any) => {
            // check limit
            const element = event.target;
            const dataId = element.dataset.id;
            if (!dataId) return;

            const uniqId = element.id;

            if (printedWord[uniqId]) {
                return;
            } else {
                const nextId = idRef.current = idRef.current + 1;
                setPrintedWord((prev) => ({...prev, [uniqId]: {value: dataId, order: nextId}}))
            }
        }


        const dragend = () => {
            if(checkWord()) {
                setGuessedWords(value);
            }
            idRef.current = 0;
            setPrintedWord({})
        }


        ref.current.addEventListener('dragstart', dragstart)
        ref.current.addEventListener('dragenter', dragenter)
        ref.current.addEventListener('dragend', dragend)
        ref.current.addEventListener('mousedown', mousedown)

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousedown', mousedown);
                ref.current.removeEventListener('dragstart', dragstart);
                ref.current.removeEventListener('dragenter', dragenter);
                ref.current.removeEventListener('dragend', dragend);
            }
        }

    }, [ref, printedWord, checkWord])

    return (
        <div ref={ref}
             className={styles.controlsWrapper}
             style={values && values.length > 3 ? {justifyContent: 'space-around'} : {justifyContent: 'stretch'}}>
            <span className={styles.innerCircle}/>
            <div className={styles.firstLine}>
                <CircleCell
                    id={'0'}
                    value={values[0]}
                    selected={Boolean(printedWord['0'])}
                />
            </div>
            <div className={styles.secondLine}>
                <CircleCell
                    id={'1'}
                    value={values[1]}
                    selected={Boolean(printedWord['1'])}
                />
                <CircleCell
                    id={'2'}
                    value={values[2]}
                    selected={Boolean(printedWord['2'])}
                />
            </div>
            {values[3]
                ? (
                    <div className={styles.thirdLine}>
                        <CircleCell
                            id={'3'}
                            value={values[3]}
                            selected={Boolean(printedWord['3'])}
                        />
                        {values[4] ? <CircleCell
                            id={'4'}
                            value={values[4]}
                            selected={Boolean(printedWord['4'])}
                        /> : null}
                    </div>) : null}
        </div>
    );
};

export default Controls;