import HomeHero3 from '@/components/pages/home/HomeHero3';
import Narration from '@/components/pages/home/Narration';

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '200vh', position: 'relative' }}>
      <HomeHero3 />
      <main>
        <Narration />
      </main>
    </div>
  );
}
