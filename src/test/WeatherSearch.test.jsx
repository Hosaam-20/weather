import { render, screen, fireEvent } from '@testing-library/react';
import WeatherSearch from '../components/WeatherSearch';
import { describe, expect, it, vi } from 'vitest';

describe('WeatherSearch Component', () => {
    it('renders input and button', () => {
        render(<WeatherSearch city="" setCity={() => {}} onSearch={() => {}} />);
        expect(screen.getByPlaceholderText(/أدخل اسم المدينة/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /بحث/i })).toBeInTheDocument();
    });

    it('calls setCity on input change', () => {
        const mockSetCity = vi.fn();
        render(<WeatherSearch city="" setCity={mockSetCity} onSearch={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText(/أدخل اسم المدينة/i), {
        target: { value: 'Riyadh' },
    });

    expect(mockSetCity).toHaveBeenCalledWith('Riyadh');
    });

    it('calls onSearch when button is clicked', () => {
        const mockSearch = vi.fn();
        render(<WeatherSearch city="Jeddah" setCity={() => {}} onSearch={mockSearch} />);
        fireEvent.click(screen.getByRole('button', { name: /بحث/i }));
        expect(mockSearch).toHaveBeenCalled();
    });
});
