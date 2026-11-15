import { CSSProperties } from 'react';
import { experience } from '../../data/experience';
import './Aurora.css';

// Northern-lights curtains, one per company in its brand colour. Values are
// deterministic (stepped by the golden ratio) so the sky looks the same on
// every load, but each curtain sways, drifts and breathes on its own timing.
const GOLDEN = 0.618033988749895;
const fract = (n: number) => n - Math.floor(n);
const round1 = (n: number) => Math.round(n * 10) / 10;
const between = (seed: number, min: number, max: number) => round1(min + fract(seed) * (max - min));

export const auroraGlows = experience.map((job, i) => {
  const a = fract(0.13 + i * GOLDEN);
  const direction = i % 2 === 0 ? 1 : -1;
  return {
    id: job.id,
    color: job.brand.primary,
    style: {
      '--c': job.brand.primary,
      // Spread across the upper sky, overlapping like real auroral bands.
      '--left': `${round1(-35 + a * 75)}%`,
      '--top': `${between(i * 0.41 + 0.07, -14, 30)}vh`,
      '--w': `${between(i * 0.67 + 0.21, 95, 140)}vw`,
      '--h': `${between(i * 0.29 + 0.55, 42, 62)}vh`,
      '--tilt': `${round1(direction * between(i * 0.83 + 0.1, 4, 14))}deg`,
      '--skew1': `${round1(direction * between(i * 0.37, 12, 28))}deg`,
      '--skew2': `${round1(-direction * between(i * 0.59 + 0.3, 10, 24))}deg`,
      '--drift': `${round1(direction * between(i * 0.19 + 0.4, 22, 40))}vw`,
      '--dur': `${Math.round(between(i * 0.73 + 0.15, 9, 15))}s`,
      '--breathe': `${Math.round(between(i * 0.47 + 0.6, 4, 8))}s`,
      // A second, independent glide across the sky that combines with the sway.
      '--flow': `${Math.round(between(i * 0.61 + 0.05, 7, 12))}s`,
      '--flow-x': `${round1(-direction * between(i * 0.23 + 0.7, 10, 20))}vw`,
      '--delay': `-${Math.round(between(i * 0.31, 0, 12))}s`,
    } as CSSProperties,
  };
});

/** Northern-lights curtains in the colours of each company in the experience section. */
const Aurora = () => (
  <div className="aurora" aria-hidden>
    {auroraGlows.map((glow) => (
      <span key={glow.id} className="aurora-glow" style={glow.style}>
        <span className="aurora-curtain" />
      </span>
    ))}
  </div>
);

export default Aurora;
