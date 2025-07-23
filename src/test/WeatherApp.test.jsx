import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherApp from '../pages/WeatherApp';
import * as api from '../components/FetchWeather';
import { describe, expect, it, vi } from 'vitest';

// محاكاة دالة fetch
vi.mock('../components/FetchWeather');

describe('WeatherApp Component', () => {
    it('shows weather data after search', async () => {
    const mockData = {
    data: {
        temp: 28,
        status: 'Clear',
        description: 'سماء صافية',
    },
        err: null,
    };

    api.default.mockResolvedValueOnce(mockData);

    render(<WeatherApp />);
    
    // أدخل اسم مدينة
    fireEvent.change(screen.getByPlaceholderText(/أدخل اسم المدينة/i), {
        target: { value: 'Riyadh' },
    });

    // انقر بحث
    fireEvent.click(screen.getByText(/بحث/i));

    // تأكد من ظهور البيانات بعد التحميل
    await waitFor(() => {
        expect(screen.getByText(/28°C/)).toBeInTheDocument();
        expect(screen.getByText(/Clear/)).toBeInTheDocument();
        expect(screen.getByText(/سماء صافية/)).toBeInTheDocument();
    });
});

    it('shows error when API fails', async () => {
        api.default.mockResolvedValueOnce({
        data: null,
        err: 'لم يتم العثور على المدينة',
    });

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/أدخل اسم المدينة/i), {
        target: { value: 'InvalidCity' },
    });

    fireEvent.click(screen.getByText(/بحث/i));

    await waitFor(() => {
        expect(screen.getByText(/لم يتم العثور على المدينة/)).toBeInTheDocument();
    });
});
});
