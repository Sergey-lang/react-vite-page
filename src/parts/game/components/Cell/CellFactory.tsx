import { SmallCell } from './SmallCell/SmallCell.tsx';
import { BigCell } from './BigCell/BigCell.tsx';

interface IProps {
    size: 'small' | 'big',
    value: string;
    isShowSymbol?: boolean;
    isGuessedWord?: boolean;
}

const CellFactory = ({size, value, isShowSymbol, isGuessedWord}: IProps) => {
    switch (size) {
        case 'small': {
            return <SmallCell
                value={value}
                isShowSymbol={isShowSymbol}
                isGuessedWord={isGuessedWord}
            />
        }
        case 'big': {
            return <BigCell
                value={value}
                isShowSymbol={isShowSymbol}
                isGuessedWord={isGuessedWord}
            />
        }
        default: {
            return <BigCell
                value={value}
                isShowSymbol={isShowSymbol}
                isGuessedWord={isGuessedWord}
            />
        }
    }
};

export default CellFactory;