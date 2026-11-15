import { act, render } from '@testing-library/react';
import { DELETE_MS, GAP_MS, HOLD_MS, TYPE_MS, useTypedPhrase } from './TypingLine';

const seen: string[] = [];
const Probe = ({ words }: { words: string[] }) => {
  const { text } = useTypedPhrase(words);
  seen.push(text);
  return <span>{text}</span>;
};

beforeEach(() => {
  seen.length = 0;
  jest.useFakeTimers();
});
afterEach(() => jest.useRealTimers());

// React schedules the next step only after re-rendering, so move time in
// small slices, each inside its own act().
const advance = (ms: number) => {
  for (let elapsed = 0; elapsed < ms; elapsed += 10) {
    act(() => void jest.advanceTimersByTime(Math.min(10, ms - elapsed)));
  }
};

test('types, holds, deletes and moves on without flashing the old phrase', () => {
  render(<Probe words={['ab', 'xyz']} />);
  advance(TYPE_MS * 2 + HOLD_MS + DELETE_MS * 2 + GAP_MS + TYPE_MS * 3 + 200);

  // Distinct frames, in order. The old code flashed "a" (most of the phrase)
  // right after reaching "" because slice(0, -1) wraps around.
  const frames = seen.filter((text, i) => i === 0 || text !== seen[i - 1]);
  expect(frames.slice(0, 8)).toEqual(['', 'a', 'ab', 'a', '', 'x', 'xy', 'xyz']);
});

test('never splits an emoji', () => {
  render(<Probe words={['go 🎁']} />);
  advance(TYPE_MS * 4);
  expect(seen).not.toContainEqual(expect.stringMatching(/[\uD800-\uDBFF]$/));
  expect(seen[seen.length - 1]).toBe('go 🎁');
});
