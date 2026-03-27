'use client';

import styles from '@/styles/shared/DescrambleText.module.css';

// TYPES
type DescrambleTextProps = {
  text: string;
};

// patterns
// 1. SEARCH EVERY WHITE SPACE
const PATTERN1 = /(\s+)/;
// 2. IS IT A TOKEN WITH WHITE SPACE?
const PATTERN2 = /^\s+$/;

// const
const LEET_MAP: Record<string, string> = {
  // Litery → cyfry (klasyczny leet)
  a: '4',
  e: '3',
  i: '1',
  o: '0',
  s: '5',
  t: '7',
  b: '8',
  // g: '9',
  l: '1',
  z: '2',
  at: '@',
  c: '(',
  h: '#',
};

function DescrambleCarousel({ char, isOdd }: { char: string; isOdd: boolean }) {
  return (
    <span className={styles.carousel}>
      <span className={`${styles.carouselInner} ${isOdd ? styles.carouselInnerOdd : ''}`}>
        {isOdd ? (
          // odwrócona kolejność — litera na górze, cyfra na dole
          <>
            <span className={styles.letter}>{char}</span>
            <span className={styles.digit}>{LEET_MAP[char.toLowerCase()]}</span>
          </>
        ) : (
          // normalna kolejność — cyfra na górze, litera na dole
          <>
            <span className={styles.digit}>{LEET_MAP[char.toLowerCase()]}</span>
            <span className={styles.letter}>{char}</span>
          </>
        )}
      </span>
    </span>
  );
}

function DescrambleWord({ word, index }: { word: string; index: number }) {
  return (
    <span className={styles.word}>
      {[...word].map((char, j) => {
        const charNumber = index + 1 + j;
        const isLeetChar = LEET_MAP[char.toLowerCase()];

        return isLeetChar ? (
          <DescrambleCarousel key={j} isOdd={charNumber % 2 != 0 ? true : false} char={char} />
        ) : (
          <span key={j}>{char}</span>
        );
      })}
    </span>
  );
}

function DescrambleText({ text }: DescrambleTextProps) {
  const tokens = text.split(PATTERN1);

  return (
    <span className={styles.textBlock}>
      {tokens.map((token, index) =>
        PATTERN2.test(token) ? token : <DescrambleWord key={index} index={index} word={token} />
      )}
    </span>
  );
}

export default DescrambleText;
