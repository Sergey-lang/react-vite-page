import cn from 'clsx';
import style from './Title.module.css';
import { ReactNode } from 'react';

interface ITitleProps {
    level?: number;
    className?: string;
    children: ReactNode;
}

const Title = ({level = 1, className = '', children}: ITitleProps) => {
    const Tag = `h${level}`;

    return <Tag className={cn(style.title, className)}>{children}</Tag>;
};

export { Title };
