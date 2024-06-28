import styles from './game.module.scss'
import { useCallback, useEffect, useState } from 'react';
import Controls from './components/Controls/Controls.tsx';
import CellFields from './components/CellFields/CellFields.tsx';
import WinScreen from './components/WinScreen/WinScreen.tsx';
import ScreenLayout from './components/ScreenLayout/ScreenLayout.tsx';
import useGetLevelWords from './hook/useGetLevelWords.ts';
import { IPrintedObj } from './components/types';

const getRandomIndex = (length: number): number => Math.floor(Math.random() * length);

const Game = () => {
    const [currentLvl, setCurrentLvl] = useState<number>(1);
    const [guessedWords, setGuessedWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>();
    const [printedWord, setPrintedWord] = useState<IPrintedObj>({});
    const [isShowWinScreen, setIsWinScreen] = useState<boolean>(false);
    console.log('currentWord', currentWord);
    console.log('guessedWords', guessedWords);
    const currentLevelWords = useGetLevelWords(currentLvl);
    const setNextLevel = () => {
        setCurrentLvl((prev) => prev + 1);
        setCurrentWord(undefined);
        setPrintedWord({});
        setGuessedWords([]);
        setIsWinScreen(false);
    }

    const getRandomWordFromArray = useCallback((array: string[]): string | undefined => {
        if (array.length === 0) {
            throw new Error('No words array!')
        }

        if (currentLevelWords.length === guessedWords.length) {
            setIsWinScreen(true);
            return;
        }

        const randomIndex = getRandomIndex(array.length);

        const setWord = (): void => {
            const startWord = array[randomIndex];
            setCurrentWord(startWord);
        }

        if (!guessedWords.length) {
            setWord();
            return;
        }

        if (!guessedWords.includes(array[randomIndex])) {
            setWord();
            return;
        }

        getRandomWordFromArray(array);
    }, [guessedWords, currentLevelWords, setCurrentWord])


    const updateGuessedWordsState = (newGuessedWord: string): void => {
        setGuessedWords((prev => [...prev, newGuessedWord]))
        setPrintedWord({})
    }

    useEffect(() => {
        getRandomWordFromArray(currentLevelWords);
    }, [guessedWords])

    useEffect(() => {
        if (!currentLevelWords.length || currentWord) return;
        getRandomWordFromArray(currentLevelWords);
    }, [getRandomWordFromArray, currentLevelWords, currentWord])

    return (
        <ScreenLayout>
            {isShowWinScreen ? (
                <WinScreen level={currentLvl} nextLevel={setNextLevel}/>
            ) : (
                <>
                    <h1 className={styles.level}>Уровень {currentLvl}</h1>
                    <div className={styles.wrapper}>
                        <CellFields<string[]>
                            size={currentLevelWords.length > 6 ? 'small': 'big'}
                            values={currentLevelWords}
                            guessedWords={guessedWords}
                        />
                    </div>
                    <div className={styles.smallFieldWrapper}>
                        <CellFields<IPrintedObj>
                            size="small"
                            stylesProp={{maxWidth: '100%', height: '61px'}}
                            values={printedWord}
                            isShowValue={true}
                        />
                    </div>
                    <div className={styles.circleWrapper}>
                        <Controls
                            buttonsValue={currentWord}
                            setPrintedWord={setPrintedWord}
                            setGuessedWords={updateGuessedWordsState}
                            printedWord={printedWord}
                            currentLevelWords={currentLevelWords}/>
                    </div>
                </>
            )}

        </ScreenLayout>

    );
};

export default Game;