import { CategoryType } from '@const/navigation.ts';

interface IProps {
    items: CategoryType[]
    selectedCategory: string;
    setCategory: (value: string) => void;
}

export const LeftNav = ({items, setCategory, selectedCategory}: IProps) => {

    const onClickSetCategory = (newCategory: string) => {
        setCategory(newCategory)
    }

    return (
        <aside>
            <nav className="left-menu">
                <ul>
                    {
                        items.map(({title, id}) => {
                            const isSelected = title === selectedCategory;
                            return (
                                <li key={id}>
                                    <button
                                        aria-selected={isSelected}
                                        aria-label={title}
                                        type="button"
                                        className={`left-menu__button ${isSelected && 'left-menu__button-active'}`}
                                        onClick={() => onClickSetCategory(title)}>{title}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </aside>
    )
}