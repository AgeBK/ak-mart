import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';
import { ContainerProps } from '@/app/lib/definitions';
import styles from '@/app/css/Container.module.css';

export default function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
