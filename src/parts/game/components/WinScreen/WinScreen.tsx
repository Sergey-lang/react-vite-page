import styles from './WinScreen.module.scss'

interface IProps {
    level: number;
    nextLevel: () => void;
}

const WinScreen = ({level, nextLevel}: IProps) => {
    return (
        <div className={styles.wrapper}>
            <div>
                <h2>Уровень {level} пройден</h2>
                <h1>Изумительно!</h1>
            </div>
            <button
                type={'button'}
                onClick={nextLevel}
            >
                Уровень {level + 1}
            </button>
        </div>
    );
};

export default WinScreen;