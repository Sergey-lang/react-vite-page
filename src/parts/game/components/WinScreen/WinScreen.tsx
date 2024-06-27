interface IProps {
    level: number;
    nextLevel: () => void;
}

const WinScreen = ({level, nextLevel}: IProps) => {
    return (
        <div>
            <h1>Уровень {level} пройден</h1>
            <h1>Изумительно!</h1>
            <div>
                <button type={'button'} onClick={nextLevel}>Уровень {level + 1}</button>
            </div>
        </div>
    );
};

export default WinScreen;