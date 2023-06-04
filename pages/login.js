import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from "react";
import Link from 'next/link';
import axios from 'axios';
import { setSession } from "../server/auth";

export default function Home({data}) {
  const [email, setemail] = useState('');
  const [haslo, setpassword] = useState('');
  const cookie = require('cookie');
  const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await axios.post('./api/db/loguser', {email,  haslo} )
      console.log(res.data)
      if(res.status==203){
        window.alert("Niepoprawny email");
        location.reload()
      }
      else if(res.status==204){
        window.alert("Niepoprawne hasło");
        location.reload()
      }
      else{
        
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
                    <h2>Logowanie</h2>
                    <label htmlFor="fname">E-mail:</label><br/>
                    <input type="email" required value={email} onChange={(e) => setemail(e.target.value)}/><br/><br/>
                        <label htmlFor="lname">Hasło:</label><br/>
                        <input type="password" minlength="8" required value={haslo} onChange={(e) => setpassword(e.target.value)}/><br/><br/>
                        <input type="submit" class="sbutton" value="Zaloguj"/><br/><br/>
                        <Link href="/signin" passHref>
                        Nie masz konta? Zarejestruj się!
                        </Link>
                    </form> 
                </div>
                </div>
                </div>
      </div>
    </div>
  )
}