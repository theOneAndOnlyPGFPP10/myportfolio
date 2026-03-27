'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/pages/home/Intro.module.css';
import { AuthorsMessageProps, authorsMessages } from '@/lib/services';
import { ScrambleText } from '@/components/shared/animations/ScrambleText';
import { useInView } from 'motion/react';
import RegularCircle from '@/components/shared/RegularCircle';

type MessageState = {
  authorMessage: AuthorsMessageProps;
  isMounted: boolean;
};

function AuthorMessage({ message, isMounted }: { message: AuthorsMessageProps; isMounted: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [isMounted]);

  return (
    <div className={styles.authors_message}>
      <div
        style={{
          width: 'clamp(100px, 10vw, 200px)',
          scale: visible ? '1' : '0',
          transition: `scale 0.7s cubic-bezier(0.34, 1.8, 0.64, 1)`,
        }}
      >
        <RegularCircle image={message.img} />
      </div>
      <h4 style={{ width: 'clamp(10px, 100vw, 1080px)' }} className={styles.authors_text}>
        <ScrambleText mounting={isMounted} text={message.text} />
      </h4>
    </div>
  );
}

export default function Intro() {
  const [messages, setMessages] = useState<MessageState[]>(
    authorsMessages.map((authorMessage) => ({ authorMessage, isMounted: false }))
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeouts = messages.map((_, index) =>
      setTimeout(
        () => {
          setMessages((prev) => prev.map((msg, i) => (i === index ? { ...msg, isMounted: true } : msg)));
        },
        (0.5 + index) * 7000
      )
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isInView]);

  const firstMounted = messages[0]?.isMounted ?? false;

  return (
    <div style={{ height: '120vh', position: 'relative' }}>
      <div
        ref={ref}
        style={{
          position: 'sticky',
          top: '20vh',
          maxHeight: '80vh',
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 16px',
        }}
      >
        {firstMounted ? (
          messages.map((message, index) => (
            <AuthorMessage key={index} message={message.authorMessage} isMounted={message.isMounted} />
          ))
        ) : (
          <h3 className={styles.incoming} aria-live="polite">
            [INCOMING MESSAGE FROM THE AUTHOR]
          </h3>
        )}
      </div>
    </div>
  );
}
