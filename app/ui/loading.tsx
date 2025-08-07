import styles from "@/app/css/Loading.module.css";
// loading.tsx is a special Next.js file built on top of Suspense
// it allows you to create fallback UI to show as a replacement while page content loads.

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loading} role="alert" aria-live="assertive">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
