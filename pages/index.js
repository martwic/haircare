import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { getSession } from '@/server/auth';

export default function Home({data, session}) {
  return (
    <div>
      <div className='main'>
        <div className="left">
        <div className="section">
                  <h1>HAIRCARE</h1>
                  <h3>Wybierz najlepsze kosmetyki dobrane do Twoich włosów!</h3>
        </div>
        </div>
            <div className="right">
                <div className="foto1_container">
                    <div className="login">
                    {!session && <Link href="/login" passHref><button className="button1" role="button">ZALOGUJ SIĘ</button></Link>}
                    {session && <Link href="/account" passHref><button className="button1" role="button">   KONTO   </button></Link>}
                    </div>
                </div>
            </div>
      </div>
      </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  return { props: { session } };
}
