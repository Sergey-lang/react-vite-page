import styles from './game.module.scss'
import { useCallback, useEffect, useState } from 'react';
import Controls from './components/Controls/Controls.tsx';
import CellFields from './components/CellFields/CellFields.tsx';
import WinScreen from './components/WinScreen/WinScreen.tsx';
import ScreenLayout from './components/ScreenLayout/ScreenLayout.tsx';
import useGetLevelWords from './hook/useGetLevelWords.ts';
import { IPrintedObj } from './components/types';
import lvlFinished from './sound/zvuk-pobedyi-v-igrovom-urovne-30120.mp3';
import bgSound from './sound/Ruth_Barrett_-_Glass_Box_.mp3';

const getRandomIndex = (length: number): number => Math.floor(Math.random() * length);

const lvlEndSound = new Audio(lvlFinished);
const backgroundSound = new Audio(bgSound);

const playSound = async (audioSrc: HTMLAudioElement) => {
    audioSrc.volume = 0.3
    await audioSrc.play();
}

const Game = () => {
    const [isStarted, setStarted] = useState<boolean>(false);
    const [currentLvl, setCurrentLvl] = useState<number>(1);
    const [guessedWords, setGuessedWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>();
    const [printedWord, setPrintedWord] = useState<IPrintedObj>({});
    const [isShowWinScreen, setIsWinScreen] = useState<boolean>(false);

    const currentLevelWords = useGetLevelWords(currentLvl);
    const setNextLevel = (): void => {
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

        if (array.length === guessedWords.length) {
            lvlEndSound.play();
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
        if (!isStarted) return;
        getRandomWordFromArray(currentLevelWords);
    }, [guessedWords, currentLevelWords])

    const handleStart = async () => {
        await playSound(backgroundSound)
        getRandomWordFromArray(currentLevelWords);
        setStarted(true);
    }

    return (
        <ScreenLayout>
            {!isStarted && (
                <WinScreen handler={handleStart} btnTitle={'Начнём игру?'}/>
            )}
            {isShowWinScreen && (
                <WinScreen level={currentLvl} handler={setNextLevel} btnTitle={'Уровень'}/>
            )}
            {currentWord && !isShowWinScreen && (
                <>
                    <h1 className={styles.level}>Уровень {currentLvl}</h1>
                    <div className={styles.wrapper}>
                        <CellFields<string[]>
                            size={currentLevelWords.length > 6 ? 'small' : 'big'}
                            values={currentLevelWords}
                            guessedWords={guessedWords}
                        />
                    </div>
                    <div className={styles.wrapper}>
                        <CellFields<IPrintedObj>
                            size="small"
                            stylesProp={{maxWidth: '100%', minHeight: '42px'}}
                            values={printedWord}
                            isShowValue={true}
                        />
                    </div>
                    <div className={styles.circleWrapper}>
                        <Controls
                            buttonsValue={currentWord}
                            setPrintingWord={setPrintedWord}
                            setGuessedWords={updateGuessedWordsState}
                            printingWord={printedWord}
                            currentLevelWords={currentLevelWords}/>
                    </div>
                </>
            )}
        </ScreenLayout>
    );
};

export default Game;