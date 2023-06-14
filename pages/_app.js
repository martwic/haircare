import '@/styles/globals.scss'
import MainLayout from '@/components/layout';
import { getSession } from '@/server/auth';

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <MainLayout session={session}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}


export async function getServerSideProps({ req }) {
  const session = getSession(req);
  return { props: { session } };
}


