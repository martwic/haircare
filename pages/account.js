import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import cookie from 'cookie';
import { getSession } from "../server/auth";
import { destroySession } from '../server/auth';
import Router from "next/router";
import {  NextResponse } from 'next/server'

export default function Home({ session, userdata }) {
  const handleLogout = async () => {
    await fetch('/api/logout'); // Wywołanie endpointu /api/logout
    Router.push("/login"); // Przekierowanie po wylogowaniu na stronę logowania
  };
  if (!session) {
    return (null);
  } 

  return (
    <div>
      <div className='bodyLog'>
        <div className='mainLog'>
          <div className="sectionLog">
                 
            {userdata.map((uzytkownicy) => (
      <div key={uzytkownicy.id_konta}>
        <h2>Cześć, {uzytkownicy.imie}!</h2>
        <p>Typ włosa: {uzytkownicy.typ_wlosa.nazwa_typu}</p>
        <Link href={`/hairForm?id=${uzytkownicy.id_konta}`}><button>ANKIETA</button></Link><br/>
            <button onClick={handleLogout}>Wyloguj</button>
        </div>
    ))}

          </div>
        </div>
      </div>
    </div>
  );
  
}

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  if(!session){
    return {
      props: {
        session
      },
    }
  }
  const { user } = session;
  const userdata= await prisma.uzytkownicy.findFirst({
    include: {
      typ_wlosa: true, 
    },
    where:{
      konta:{email: user.email,}
    },
  })
  return {
    props: {
      userdata: [JSON.parse(JSON.stringify(userdata))],
      session
    },
  }
}




