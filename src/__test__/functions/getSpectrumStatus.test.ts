import { BASE_URL } from '@/services/baseUrl';
import { getSpectrumStatus } from '@/services/getSpectrumStatus';
import { describe, expect, it, vi } from 'vitest';

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        altitude: -5100,
        isActionRequired: false,
        isAscending: true,
        statusMessage: 'OK',
        temperature: 25,
        velocity: 60,
      }),
  })
);

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var global: any;

describe('getSpectrumStatus', () => {
  it('should return a Promise that resolves with SpectrumStatusT object', () => {
    // Replace the global fetch function with the mock
    global.fetch = mockFetch;
    const result = getSpectrumStatus();
    expect(result).toBeInstanceOf(Promise);

    // the Promise resolves with the expected data
    return result.then((data) => {
      expect(data).toEqual({
        altitude: -5100,
        isActionRequired: false,
        isAscending: true,
        statusMessage: 'OK',
        temperature: 25,
        velocity: 60,
      });
    });
  });

  it('should make a GET request to the correct API endpoint', () => {
    // Mock the fetch function

    global.fetch = mockFetch;
    getSpectrumStatus();
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/SpectrumStatus`);
  });

  it('should handle API endpoint not available', () => {
    // Mock the fetch function to simulate a network error
    const mockFetch = vi.fn(() => Promise.reject(new Error('Network error')));
    global.fetch = mockFetch;
    const result = getSpectrumStatus();
    expect(result).toBeInstanceOf(Promise);

    // Assert that the Promise rejects with the expected error
    return result.catch((error) => {
      expect(error).toEqual(new Error('Network error'));
    });
  });

  it('should handle API endpoint returning unexpected data format', () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            invalidField: 'Invalid data',
          }),
      })
    );

    global.fetch = mockFetch;
    const result = getSpectrumStatus();
    expect(result).toBeInstanceOf(Promise);

    return result.catch((error) => {
      expect(error).toEqual(new Error('Unexpected data format'));
    });
  });
});
