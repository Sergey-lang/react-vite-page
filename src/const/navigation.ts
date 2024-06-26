export interface CategoryType {
  readonly id: number;
  readonly title: string;
}

export const CATEGORIES: CategoryType[] = [
    {id: 0, title: 'Все темы'},
    {id: 1, title: 'Логика и мышление'},
    {id: 2, title: 'Загадки'},
    {id: 3, title: 'Головоломки'},
    {id: 4, title: 'Путешествия'},
]
