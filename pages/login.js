import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

export default function Home({data}) {
  return (
    <div>
      <div class='bodyLog'>
      <div class='mainLog'>
      <div class="sectionLog">
                <div class="box">
                    <form>
                    <h2>Logowanie</h2>
                    <label for="fname">E-mail:</label><br/>
                        <input type="text" id="email" name="email" required/><br/><br/>
                        <label for="lname">Hasło:</label><br/>
                        <input type="password" id="lname" name="password" required/><br/><br/>
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
