import { useMemo, useState } from 'react';
import firstWords from '../levels/1.json';
import secondWords from '../levels/2.json';
import thirdWords from '../levels/3.json';

const useGetLevelWords = (level: number) => {
    const [lvlCount, setLvlCount] = useState<number>(level)
    return useMemo(() => {
        switch (lvlCount) {
            case 1: {
                setLvlCount((prev) => prev + 1)
                return firstWords.words
            }
            case 2: {
                setLvlCount((prev) => prev + 1)
                return secondWords.words
            }
            case 3: {
                setLvlCount(1)
                return thirdWords.words
            }
            default: {
                return []
            }
        }
    }, [level])
};

export default useGetLevelWords;