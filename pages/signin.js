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
                    <h2>Rejestracja</h2>
                        <label for="fname">Imię:</label><br/>
                        <input type="text" name="name"required></input><br/>
                        <label for="fname">Nazwisko:</label><br/>
                        <input type="text" name="lastname" required></input><br/>
                        <label for="fname">e-mail:</label><br/>
                        <input type="text" name="email" required></input><br/>
                        <label for="fname">Login:</label><br/>
                        <input type="text" name="login" required></input><br/>
                        <label for="lname">Hasło:</label><br/>
                        <input type="password" name="password" required></input><br/><br/>
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
