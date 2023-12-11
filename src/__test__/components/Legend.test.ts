import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Legend from '@/components/Legend/Legend';
import Positive from '@/assets/positive.png';
import Negative from '@/assets/negative.png';

describe('Legend', () => {
  it('should render two images with correct classes, sources, and alt attributes', () => {
    render(Legend());
    const images = screen.getAllByRole('img');

    expect(images.length).toBe(2);
    expect(images[0].classList.contains('Legend__item')).toBe(true);
    expect(images[0].getAttribute('src')).toBe(Positive);
    expect(images[0].getAttribute('alt')).toBe('positive numbers legend');
    expect(images[1].classList.contains('Legend__item')).toBe(true);
    expect(images[1].getAttribute('src')).toBe(Negative);
    expect(images[1].getAttribute('alt')).toBe('negative numbers legend');
  });

  it('should display the legend container with correct class', () => {
    const { container } = render(Legend());

    expect(container.getElementsByClassName('Legend')).toHaveLength(1);
  });

  it("should not have a 'title' attribute for any image", () => {
    render(Legend());
    const images = screen.getAllByRole('img');

    images.forEach((image) => {
      expect(image.getAttribute('title')).toBeNull();
    });
  });

  it("should have non-empty 'src' attributes for all images", () => {
    render(Legend());
    const images = screen.getAllByRole('img');

    images.forEach((image) => {
      expect(image.getAttribute('src')).toBeTruthy();
    });
  });

  it("should have non-empty 'alt' attributes for all images", () => {
    render(Legend());
    const images = screen.getAllByRole('img');

    images.forEach((image) => {
      expect(image.getAttribute('alt')).toBeTruthy();
    });
  });
});
