import styles from './SmallCell.module.scss'

interface IProps {
    value: string
}
export const SmallCell = ({value}: IProps) => {
    return (
        <div className={styles.box}>
            {value}
        </div>
    );
};