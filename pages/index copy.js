import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>HairCare</title>
        <meta name="description" content="Strona o produktach do włosów" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className={styles.main}>
        <header>
          <nav>
            <img href="/images/logo.png"></img>
            <a href='/products'>Produkty</a>
            <a href='/about-us'>O nas</a>
            <a href='#'>Konto</a>
          </nav>
        </header>
      </main>
      <footer className={styles.footer}>

      </footer>
    </>
  )
}
