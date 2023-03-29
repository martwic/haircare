import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

export default function Home({data}) {
  return (
    <div>
      <div class='main'>
        <div class="left">
        <div class="section">
                  <h1>HAIRCARE</h1>
                  <h3>Wybierz najlepsze kosmetyki dobrane do Twoich włosów!</h3>
        </div>
        </div>
            <div class="right">
                <div class="foto1_container">
                    <div class="login">
                        <a href="/login"><button class="button1" role="button">ZALOGUJ SIĘ</button></a>
                    </div>
                </div>
            </div>
      </div>
      </div>
  )
}
