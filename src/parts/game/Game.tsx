import styles from './game.module.scss'
import Controls, { IPrintedObj } from '@components/Controls/Controls.tsx';
import CellFields from '@components/CellFields/CellFields.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { returnLevelWords } from './services/levelParserService.ts';

const Game = () => {
    const [level, setLevel] = useState<number>(1);
    const [guessedWords, setGuessedWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [printedWord, setPrintedWord] = useState<IPrintedObj>({});
    const [isWind, setIsWin] = useState<boolean>(false);
    console.log(currentWord);
    console.log('guessedWords', guessedWords);

    const currentLevelWords = useMemo(() => {
        return returnLevelWords(level)
    }, [level])

    const getRandomWordFromArray = useCallback((array: string[]): string | undefined => {
        if (array.length === 0) {
            return undefined;
        }

        if (currentLevelWords === guessedWords) {
            console.log('NEXT LEVEL!')
            setIsWin(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * array.length);
        if (!guessedWords.length) {
            // start
            setCurrentWord(array[randomIndex]);
            return;
        }

        if (!guessedWords.includes(array[randomIndex])) {
            const nextWord = array[randomIndex];
            // next
            setCurrentWord(nextWord);
            return;
        }

        getRandomWordFromArray(array);

    }, [guessedWords, currentLevelWords, setCurrentWord])


    const updateGuessedWords = (v: string) => {
        setGuessedWords((prev => [...prev, v]))
    }

    useEffect(() => {
        getRandomWordFromArray(currentLevelWords);
    }, [guessedWords])

    useEffect(() => {
        if (currentLevelWords.length < 1 || currentWord) return;
        getRandomWordFromArray(currentLevelWords);
    }, [getRandomWordFromArray, currentLevelWords])


    return (
        <div className={styles.gameContainer}>
            <h1 className={styles.level}>Уровень 1</h1>
            <div className={styles.wrapper}>
                <CellFields size="big"/>
                <CellFields size="big" cellCount={5} stylesProp={{maxWidth: '100%'}}/>
            </div>
            <div className={styles.smallFieldWrapper}>
                <CellFields size="small" stylesProp={{maxWidth: '100%', height: '61px'}} values={printedWord}/>
            </div>
            <div className={styles.circleWrapper}>
                <Controls
                    value={currentWord}
                    setPrintedWord={setPrintedWord}
                    setGuessedWords={updateGuessedWords}
                    printedWord={printedWord}/>
            </div>
        </div>

    );
};

export default Game;