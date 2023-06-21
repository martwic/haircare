import Link from 'next/link';
import React from 'react';
import Image from 'next/image';


export const Header = ({session}) => {
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
              {!session && 
              <li>
                <Link href="/account" passHref>
                  Konto
                </Link>
              </li>}
              {session && 
              <li>
                <Link href="/login" passHref>
                  Zaloguj się
                </Link>
              </li>}
            </ul>
          </div>
    </header>
  );}

