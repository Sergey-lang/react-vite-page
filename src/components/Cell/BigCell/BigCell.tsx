import styles from './BigCell.module.scss'

interface IProps {
    value: string
}

export const BigCell = ({value}: IProps) => {
    return (
        <div className={styles.box}>
            {value}
        </div>
    );
};