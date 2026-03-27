import HomeHero3 from '@/components/pages/home/HomeHero3';
import Intro from '@/components/pages/home/Intro';
import Narration from '@/components/pages/home/Narration';
import styles from '@/styles/pages/home/HomePage.module.css';

export default function Home() {
  return (
    <div style={{ minHeight: '400vh' }} className={styles.home_page}>
      <HomeHero3 />
      <main>
        <section id="About">
          <Intro />
          <Narration />
        </section>
      </main>
    </div>
  );
}
