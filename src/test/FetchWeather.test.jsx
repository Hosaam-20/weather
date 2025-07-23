import FetchWeather from '../components/FetchWeather';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('FetchWeather', () => {

    const mockApiKey = 'fake-api-key';

    beforeEach(() => {
        import.meta.env = { VITE_WEATHER_API_KEY: mockApiKey };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('يرجع بيانات الطقس عند نجاح الاستدعاء', async () => {
        const mockResponse = {
        weather: [{ main: 'Clear', description: 'سماء صافية' }],
        main: { temp: 28 },
        };

        vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
        ));

        const result = await FetchWeather('Riyadh');

        expect(fetch).toHaveBeenCalled();
        expect(result.data).toEqual({
        status: 'Clear',
        description: 'سماء صافية',
        temp: 28,
        });
        expect(result.err).toBeNull();
    });

    it('يرجع خطأ عند فشل الاستدعاء (مثل مدينة غير موجودة)', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
            ok: false,
            json: () => Promise.resolve({}) 
        })
        ));

        const result = await FetchWeather('مدينة_وهمية');

        expect(result.data).toBeNull();
        expect(result.err).toBe('لم يتم العثور على المدينة');
    });

    it('يرجع خطأ عند حدوث مشكلة في الشبكة', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
        Promise.reject(new Error('Network error'))
        ));

        const result = await FetchWeather('any');
        expect(result.data).toBeNull();
        expect(result.err).toBe('Network error');
    });
});
