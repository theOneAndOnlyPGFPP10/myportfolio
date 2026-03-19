'use client';

import React, { useEffect, useState } from 'react';

interface MyScrambleProps {
  text: string;
  mount?: boolean;
}

function MyScrambleText({ text, mount = true }: MyScrambleProps) {
  const [chars, setChars] = useState<{ char: string; scrambling: boolean }[]>(
    text.split('').map((char) => ({ char, scrambling: false }))
  );

  useEffect(() => {}, []);
  return <span></span>;
}

export default MyScrambleText;
