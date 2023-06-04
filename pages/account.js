import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import cookie from 'cookie';
import { getSession } from "../server/auth";
import { destroySession } from '../server/auth';
import Router from "next/router";

export default function Home({ session }) {
  const handleLogout = () => {
    //destroySession();
    //Router.push("/login"); // Przekierowanie po wylogowaniu na stronę logowania
  };

  if (session) {
    return (
      <div>
        <div className='bodyLog'>
          <div className='mainLog'>
            <div className="sectionLog">
              <Link href="/hairForm"><button>ANKIETA</button></Link>
              <button onClick={handleLogout}>Wyloguj</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Obsługa dla niezalogowanego użytkownika
    return null;
  }
}

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  return { props: { session } };
}
