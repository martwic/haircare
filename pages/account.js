import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { getSession } from "../server/auth";
import Router from "next/router";
import { useRouter } from 'next/dist/client/router';
import { prisma } from '@/server/db/client';
import ReportGenerator from '@/components/accauntsReport';

export default function Home({ session, userdata, accountType, favourites }) {
  const handleLogout = async () => {
    await fetch('/api/logout'); // Wywołanie endpointu /api/logout
    Router.push("/login"); // Przekierowanie po wylogowaniu na stronę logowania
  };
  if (!session) {
    const router = useRouter();
    router.push('/login');
    return null;
  } 
/*

*/ 
else if(accountType.typ_konta_id==1){
  return(
    <div>
      <div className='bodyLog'>
        <div className='mainLog'>
          <div className="sectionLog">
            <div className='konto-main-workspace'>
              <div className='greeting'>
                <h2>Admin panel</h2>
              </div>
              <div className='workspace-element'>
              <Link href={`/hairForm`}><button className="button-ankieta">Edycja ankiety</button></Link><br/>
                <ReportGenerator/>
                <button onClick={handleLogout} className='button-logout'>Wyloguj</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

  return (
<div>
      <div className='bodyLog'>
        <div className='mainLog'>
          <div className="sectionLog">
                 
            {userdata.map((uzytkownicy) => (
            <><div key={uzytkownicy.id_konta} className='konto-main-workspace'>
            <div className='greeting'>
              <h2>Cześć, {uzytkownicy.imie}!</h2>
            </div>

            <div className='workspace-element'>
              <p>Twój typ włosa: <b>{uzytkownicy.typ_wlosa.nazwa_typu}</b></p>
            </div>

            <div className='workspace-element'>
              <Link href={`/hairForm?id=${uzytkownicy.id_konta}`}><button className="button-ankieta">WYPEŁNIJ ANKIETĘ</button></Link><br/>  
            </div>

            <div className='workspace-element'>
              <button onClick={handleLogout} className='button-logout'>Wyloguj</button>
            </div>
          </div>
              <div className='konto-favourites-workspace'>
              <p className='workspace-element'><strong>Twoje ulubione produkty</strong></p>
              <div className="produkty">
              <table>
              {favourites.map((ulubione) => (
                
                  <tr key={ulubione.id_ulubionego}>
                    <td><img alt="zdjprod" src={`/images/products/${ulubione.produkty.id_produktu}.png`} /></td>
                    <td><Link style={{ textDecoration: 'none', color: '#6F3F2D'}} href={`/offers/${ulubione.produkty.id_produktu}`} passHref><h2 >{ulubione.produkty.nazwa}</h2></Link></td>
                </tr>
                ))}
                </table>
              </div>
            </div></>
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
  const accountType= await prisma.konta.findFirst({
    select: {
      typ_konta_id:true
    },
    where:{
      email: user.email
    },
  })
  const favourites = await prisma.ulubione.findMany({
    include:{
      produkty:true,
    },
    where:{
      id_konta: userdata.id_konta
    },
  })
  return {
    props: {
      userdata: [JSON.parse(JSON.stringify(userdata))],
      session,
      accountType,
      favourites
    },
  }
}




