import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from "react";
import axios from 'axios'

export default function Home() {
  const [imie, setname] = useState('');
  const [nazwisko, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [login, setlogin] = useState('');
  const [haslo, setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('./api/db/createuser', { imie, nazwisko, login, email, haslo })
    console.log(res.data)
    if (res.status == 202) {
      window.alert("Na taki email istnieje już konto");
      location.reload()
    }
    else {
      window.location = '/account'
    }
  };
  return (
    <div>
      <div className='bodyLog'>
        <div className='mainLog'>
          <div className="sectionLog">
            <div className="box">
              <form onSubmit={handleSubmit} method='post'>
                <h2>Rejestracja</h2>
                <label htmlFor="fname">Imię:</label><br />
                <input type="text" required value={imie} onChange={(e) => setname(e.target.value)} /><br />
                <label htmlFor="fname">Nazwisko:</label><br />
                <input type="text" value={nazwisko} required onChange={(e) => setlastname(e.target.value)} /><br />
                <label htmlFor="fname">e-mail:</label><br />
                <input type="email" required value={email} onChange={(e) => setemail(e.target.value)} /><br />
                <label htmlFor="fname">Login:</label><br />
                <input type="text" required value={login} onChange={(e) => setlogin(e.target.value)} /><br />
                <label htmlFor="lname">Hasło:</label><br />
                <input type="password" minlength="8" required value={haslo} onChange={(e) => setpassword(e.target.value)} /><br /><br />
                <input type="submit" class="sbutton" value="Zarejestruj"></input><br /><br />
                <Link href="/login" passHref>
                  Mam już konto, chcę się zalogować
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

