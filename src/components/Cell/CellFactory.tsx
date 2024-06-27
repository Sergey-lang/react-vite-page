import { SmallCell } from '@components/Cell/SmallCell/SmallCell.tsx';
import { BigCell } from '@components/Cell/BigCell/BigCell.tsx';

interface IProps {
    size: 'small' | 'big',
    value: string;
}

const CellFactory = ({size, value}: IProps) => {
    switch (size) {
        case 'small': {
            return <SmallCell value={value}/>
        }
        case 'big': {
            return <BigCell value={value}/>
        }
        default: {
            return <BigCell value={value}/>
        }
    }
};

export default CellFactory;