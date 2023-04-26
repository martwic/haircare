import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from "react";

export default function Home() {
  const [imie, setname] = useState("");
  const [nazwisko, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [login, setlogin] = useState("");
  const [haslo, setpassword] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      const user = await fetch("/api/db/createuser", {
        ContentType: "application/json",
        body: JSON.stringify({ imie, nazwisko, email, login, haslo }),
      });
    };
  return (
    <div>
      <div class='bodyLog'>
      <div class='mainLog'>
      <div class="sectionLog">
                <div class="box">
                    <form onSubmit={handleSubmit}> 
                    <h2>Rejestracja</h2>
                        <label for="fname">Imię:</label><br/>
                        <input type="text" name="name" required value={imie} onChange={e => setname(e.target.value)}></input><br/>
                        <label for="fname">Nazwisko:</label><br/>
                        <input type="text" name="lastname" value={nazwisko} required onChange={e => setlastname(e.target.value)}></input><br/>
                        <label for="fname">e-mail:</label><br/>
                        <input type="text" name="email" required value={email} onChange={e => setemail(e.target.value)}></input><br/>
                        <label for="fname">Login:</label><br/>
                        <input type="text" name="login" required value={login} onChange={e => setlogin(e.target.value)}></input><br/>
                        <label for="lname">Hasło:</label><br/>
                        <input type="password" name="password" required value={haslo} onChange={e => setpassword(e.target.value)}></input><br/><br/>
                        <input type="submit" class="sbutton" value="Zarejestruj"></input><br/><br/>
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

