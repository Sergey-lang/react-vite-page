import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading.tsx';

describe('heading test', () => {
    render(<Heading/>)
    it('heading', () => {
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Testing element 2')
    })
})