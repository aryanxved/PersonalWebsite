import { useEffect, useMemo, useState } from 'react';
import './TypingLine.css';

// Timing (ms). Constant per-character steps keep the motion even.
export const TYPE_MS = 60;
export const DELETE_MS = 28;
export const HOLD_MS = 1600;
export const GAP_MS = 400;

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const joinPhrases = (words: string[]) =>
  words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')}, and ${words[words.length - 1]}`;

// Whole characters, not UTF-16 units, so emoji are never split in half.
const charsOf = (text: string) => Array.from(text);

type Phase = 'typing' | 'deleting';

/** Types each phrase, holds, deletes it, then moves to the next. */
export const useTypedPhrase = (words: string[]) => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const chars = useMemo(() => charsOf(words[index] ?? ''), [words, index]);

  useEffect(() => {
    let delay: number;
    let step: () => void;

    if (phase === 'typing') {
      if (count < chars.length) {
        delay = TYPE_MS;
        step = () => setCount(count + 1);
      } else {
        delay = HOLD_MS;
        step = () => setPhase('deleting');
      }
    } else if (count > 0) {
      delay = DELETE_MS;
      step = () => setCount(count - 1);
    } else {
      delay = GAP_MS;
      step = () => {
        setIndex((index + 1) % words.length);
        setPhase('typing');
      };
    }

    // One timer at a time, always cleared, so steps never overlap.
    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [phase, count, chars, index, words.length]);

  const moving = phase === 'deleting' ? count > 0 : count < chars.length;
  return { text: chars.slice(0, count).join(''), moving };
};

const AnimatedPhrase = ({ words }: { words: string[] }) => {
  const { text, moving } = useTypedPhrase(words);
  return (
    <>
      {text}
      <span className={`typing-cursor${moving ? ' is-moving' : ''}`} />
    </>
  );
};

/**
 * "Prefix + animated phrase" on one line of a card. Space for the longest
 * phrase is reserved up front, so the card never grows or shrinks while
 * typing. Screen readers and reduced-motion visitors get all phrases as text.
 */
const TypingLine = ({ prefix, words }: { prefix: string; words: string[] }) => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const fullText = `${prefix} ${joinPhrases(words)}`;

  if (reduceMotion) return <span>{fullText}</span>;

  const longest = words.reduce((a, b) => (charsOf(b).length > charsOf(a).length ? b : a), '');

  return (
    <span className="typing-line">
      <span className="visually-hidden">{fullText}</span>
      <span className="typing-layer typing-sizer" aria-hidden>
        {prefix} {longest}
        <span className="typing-cursor" />
      </span>
      <span className="typing-layer" aria-hidden>
        {prefix} <AnimatedPhrase words={words} />
      </span>
    </span>
  );
};

export default TypingLine;
