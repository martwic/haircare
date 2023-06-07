import Link from 'next/link';
import Image from 'next/image';
import { getSession } from "../server/auth";

export const Header = ({session}) => {
  if(!session)
  return (
    <header>
          <img alt="logo" src={'/images/logo_transparent.png'} />
          <div className='header-right'>
          <ul>
              <li>
                <Link href="/" passHref>
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/products" passHref>
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/account" passHref>
                  Konto
                </Link>
              </li>
            </ul>
          </div>
    </header>
  );
  else
  return (
    <header>
          <img alt="logo" src={'/images/logo_transparent.png'} />
          <div className='header-right'>
          <ul>
              <li>
                <Link href="/" passHref>
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/products" passHref>
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/login" passHref>
                  Zaloguj się
                </Link>
              </li>
            </ul>
          </div>
    </header>
  );
};

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  return { props: { session } };
}
