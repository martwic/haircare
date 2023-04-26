import '@/styles/globals.scss'
import MainLayout from '@/components/layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

