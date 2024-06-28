import { IPrintedObj } from '../components/types';

export const getSortedWordArrFromPrintedObject = (wordObj: IPrintedObj) => {
    const array = [...Object.values(wordObj)];
    return array.sort((a, b) => a.order - b.order);
}

export const getFullWordStrFromPrintedValue = (wordObj: IPrintedObj): string => {
    const sorted = getSortedWordArrFromPrintedObject(wordObj)
    const wordsArr = sorted.map(({value}) => value);
    return wordsArr.join('');
}

export const getLettersArrFromWord = (srtValue: string): string[] => {
    return srtValue.split('');
}

export const getRandomWordOrderArr = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}