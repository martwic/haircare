import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import cookie from 'cookie';

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const sessionToken = cookies.sessionToken;

  //if (sessionToken && isSessionValid(sessionToken)) {
  //if (sessionToken ) {
  if (1 ) {
    return {
      props: { isLoggedIn: true },
    };
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function Home({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div>
        <div className='bodyLog'>
          <div className='mainLog'>
            <div className="sectionLog">
              <Link href="/hairForm"><button>ANKIETA</button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null; // Przekierowanie na stronę logowania zostanie obsłużone przez getServerSideProps
  }
}
