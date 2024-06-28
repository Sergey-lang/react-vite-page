import styles from './Controls.module.scss'
import { CircleCell } from '../Cell/CircleCell/CircleCell.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    getFullWordStrFromPrintedValue,
    getLettersArrFromWord, getRandomWordOrderArr,
} from '../../urils/utils.ts';
import { IPrintedObj } from '../types';

interface IProps {
    buttonsValue: string | undefined;
    setPrintedWord: (newValue: IPrintedObj) => void;
    setGuessedWords: (newValue: string) => void;
    printedWord: IPrintedObj;
    currentLevelWords: string[];
}

const Controls = ({buttonsValue = '', setPrintedWord, setGuessedWords, printedWord, currentLevelWords}: IProps) => {
    const [currenWordArr, setCurrenWordArr] = useState<string[]>([])

    const tempIdRefNum = useRef<number>(0);
    const buttonsContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!buttonsValue) return;
        const symbolsArr = getLettersArrFromWord(buttonsValue);
        const randomWordOrderArr = getRandomWordOrderArr(symbolsArr)
        setCurrenWordArr(randomWordOrderArr)
    }, [buttonsValue])

    const dragEnterHandler = (event: any) => {
        // check limit
        const element = event.target;
        const dataId = element.dataset.id;
        if (!dataId) return;

        const uniqId = element.id;

        if (printedWord[uniqId]) {
            if (Object.values(printedWord).length === 1) {
                return;
            }
            // реализовать логику сброса последнего значения

          /*  const sortedWordSymbols = getSortedWordArrFromPrintedObject(printedWord);
            const lastSymbol = sortedWordSymbols[sortedWordSymbols.length - 1];
            const lastSymbolOrder = lastSymbol.order;
            if (printedWord[uniqId].order === lastSymbolOrder - 1) {


                const newObj = {...printedWord}
                const keys = Object.entries(printedWord);
                const el = keys.find(([_, el]) => el.order === lastSymbolOrder);

                if (el?.length) {
                    delete newObj[el[0]];

                    setPrintedWord(newObj)
                }

            }*/
        } else {
            const nextId = tempIdRefNum.current = tempIdRefNum.current + 1;
            const newSymbol = {value: dataId, order: nextId};
            setPrintedWord((prev) => ({...prev, [uniqId]: newSymbol}))
        }
    }

    const mouseUpHandler = () => {
        tempIdRefNum.current = 0;
        setPrintedWord({})
    }

    const dragEndHandler = useCallback(() => {
        const word = getFullWordStrFromPrintedValue(printedWord);
        if (currentLevelWords.includes(word)) {
            setGuessedWords(word);
            setPrintedWord({});
        }
        tempIdRefNum.current = 0;
        setPrintedWord({});
    }, [tempIdRefNum, printedWord])

    const mouseDownHandler = useCallback((event: any) => {
        const initId = tempIdRefNum.current;
        const element = event.target;
        const dataId = element.dataset.id;
        if (!dataId) return;

        const uniqId = element.id;
        setPrintedWord({[uniqId]: {value: dataId, order: initId}});
    }, [tempIdRefNum])

    useEffect(() => {
        if (!buttonsContainerRef.current) return;

        buttonsContainerRef.current.addEventListener('dragenter', dragEnterHandler)
        buttonsContainerRef.current.addEventListener('dragend', dragEndHandler)
        buttonsContainerRef.current.addEventListener('mousedown', mouseDownHandler)
        buttonsContainerRef.current.addEventListener('mouseup', mouseUpHandler)

        return () => {
            if (buttonsContainerRef.current) {
                buttonsContainerRef.current.removeEventListener('mousedown', mouseUpHandler);
                buttonsContainerRef.current.removeEventListener('mouseup', mouseDownHandler);
                buttonsContainerRef.current.removeEventListener('dragenter', dragEnterHandler);
                buttonsContainerRef.current.removeEventListener('dragend', dragEndHandler);
            }
        }
    }, [mouseDownHandler, dragEndHandler, mouseUpHandler])

    return (
        <div ref={buttonsContainerRef}
             className={styles.controlsWrapper}
             style={currenWordArr && currenWordArr.length > 3 ? {justifyContent: 'space-around'} : {justifyContent: 'stretch'}}>
            <span className={styles.innerCircle}/>
            <div className={styles.firstLine}>
                <CircleCell
                    id={'0'}
                    value={currenWordArr[0]}
                    selected={Boolean(printedWord['0'])}
                />
            </div>
            <div className={styles.secondLine}>
                <CircleCell
                    id={'1'}
                    value={currenWordArr[1]}
                    selected={Boolean(printedWord['1'])}
                />
                {currenWordArr[2] ? <CircleCell
                    id={'2'}
                    value={currenWordArr[2]}
                    selected={Boolean(printedWord['2'])}
                /> : null}
            </div>
            {currenWordArr[3]
                ? (
                    <div className={styles.thirdLine}>
                        <CircleCell
                            id={'3'}
                            value={currenWordArr[3]}
                            selected={Boolean(printedWord['3'])}
                        />
                        {currenWordArr[4] ? <CircleCell
                            id={'4'}
                            value={currenWordArr[4]}
                            selected={Boolean(printedWord['4'])}
                        /> : null}
                    </div>) : null}
        </div>
    );
};

export default Controls;