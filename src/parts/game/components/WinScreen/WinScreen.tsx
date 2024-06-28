import styles from './WinScreen.module.scss'

interface IProps {
    level?: number;
    handler: () => void;
    btnTitle: string;
}

const WinScreen = ({level, handler, btnTitle}: IProps) => {
    return (
        <div className={styles.wrapper}>
            {
                level && (
                    <div>
                        <h2>Уровень {level} пройден</h2>
                        <h1>Изумительно!</h1>
                    </div>
                )
            }
            <button
                aria-label={btnTitle}
                type={'button'}
                onClick={handler}
            >
                {btnTitle} {level ? level + 1 : null}
            </button>
        </div>
    );
};

export default WinScreen;