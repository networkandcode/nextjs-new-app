import styles from './page.module.css';
import dynamic from 'next/dynamic';

// Import the clock component with dynamic import to avoid SSR issues
// since the clock uses browser-only APIs like Date
const AnalogClock = dynamic(() => import('../components/AnalogClock'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome to Next.js!</h1>
        <p>Get started by editing <code>src/app/page.tsx</code></p>
      </div>
      
      {/* Add the analog clock component */}
      <AnalogClock />
      
      <div className={styles.description}>
        <p>This clock shows the current time in UTC+5:30 (Indian Standard Time)</p>
      </div>
    </main>
  );
}