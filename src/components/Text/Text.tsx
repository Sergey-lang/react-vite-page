import cn from 'clsx';

import style from './Text.module.css';
import { ReactNode } from 'react';

interface ITextPops {
    isError?: boolean;
    isSuccess?: boolean;
    className?: string;
    children: ReactNode;
}
const Text = ({ children, className, isError, isSuccess }: ITextPops) => {
  return (
    <p
      className={cn(style.text, className, {
        [style.error]: isError,
        [style.success]: isSuccess,
      })}
    >
      {children}
    </p>
  );
};

export { Text };
