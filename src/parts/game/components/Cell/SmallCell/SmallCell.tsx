import styles from './SmallCell.module.scss'

interface IProps {
    value: string;
    isShowSymbol?: boolean;
    isGuessedWord?: boolean;
}
export const SmallCell = ({value, isShowSymbol, isGuessedWord}: IProps) => {
    return (
        <div className={`${styles.box} ${isGuessedWord && styles.guessed}`}>
            {isShowSymbol ? value : ''}
        </div>
    );
};