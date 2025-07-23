import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { describe, expect, it } from 'vitest';

describe('WeatherCard Component', () => {
    
    it('renders temperature, condition, and description', () => {
        render(<WeatherCard temp={25} condition="Clear" description="سماء صافية" />);
        
        expect(screen.getByText(/25°C/)).toBeInTheDocument();
        expect(screen.getByText(/الحالة/i)).toBeInTheDocument();
        expect(screen.getByText(/سماء صافية/i)).toBeInTheDocument();
    });
});
