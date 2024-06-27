import firstWords from '../levels/1.json';
import secondWords from '../levels/2.json';
import thirdWords from '../levels/3.json';

export const returnLevelWords = (level: number) => {
    const getLevelWords = (wordsObj: { words: string[] }): string[] => {
        return wordsObj.words;
    }

    switch (level) {
        case 1:
        case 4: {
            return getLevelWords(firstWords);
        }
        case 2:
        case 5: {
            return getLevelWords(secondWords);
        }
        case 3:
        case 6: {
            return getLevelWords(thirdWords);
        }
        default: {
            return []
        }
    }
}