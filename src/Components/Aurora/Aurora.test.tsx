import { render } from '@testing-library/react';
import Aurora, { auroraGlows } from './Aurora';
import { experience } from '../../data/experience';

test('one aurora curtain per company, in that company brand colour', () => {
  expect(auroraGlows.map((g) => g.color)).toEqual(experience.map((job) => job.brand.primary));
  const { container } = render(<Aurora />);
  expect(container.querySelectorAll('.aurora-glow')).toHaveLength(experience.length);
});

test('each curtain has its own position and speed', () => {
  const durations = new Set(auroraGlows.map((g) => (g.style as Record<string, string>)['--dur']));
  const paths = new Set(auroraGlows.map((g) => (g.style as Record<string, string>)['--left']));
  expect(durations.size).toBeGreaterThan(3);
  expect(paths.size).toBe(auroraGlows.length);
});
