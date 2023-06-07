import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import cookie from 'cookie';
import { getSession } from "../server/auth";
import { destroySession } from '../server/auth';
import Router from "next/router";
import {  NextResponse } from 'next/server'

export default function Home({ session }) {
  const handleLogout = async () => {
    await fetch('/api/logout'); // Wywołanie endpointu /api/logout
    Router.push("/login"); // Przekierowanie po wylogowaniu na stronę logowania
  };
  if (!session) {
    return (null);
  } 
  const { user } = session;
  return (
    <div>
      <div className='bodyLog'>
        <div className='mainLog'>
          <div className="sectionLog">
            <h3>Cześć!</h3>       <p>Hello, {user.email}</p>;
            <Link href="/hairForm"><button>ANKIETA</button></Link>
            <button onClick={handleLogout}>Wyloguj</button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  return { props: { session } };
}


