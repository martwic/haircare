import { prisma } from '/server/db/client'
import Link from 'next/link';

export default function Home({products}){
  return (
    <div className='bodyLog'>
      <div className='mainLog'>
      <div className="sectionLog">
                <div className="boxOfProducts">
                <div className='search-bar'>
          <div id="search-container">
            <div className='select-search'>
              <input
            type="search"
            id="search-input"
            placeholder="Wyszukaj nazwę produktu..."
            className='search-box'
              />
              <div className='label-select-container'>
              <label htmlfor="typ-produktu" className="label-produkt">Typ produktu: </label>
                <select id="typ-produktu" name="typ-produktu" className="filter-select">
                  <option value="">Wszystkie</option>
                  <option value="szampon">Szampon</option>
                  <option value="odzywka">Odżywka</option>
                  <option value="maska">Maska</option>
                  <option value="serum">Serum</option>
                  <option value="wcierka">Wcierka</option>
                  <option value="peeling">Peeling</option>
                </select>
              </div>
              
              <div className='label-select-container'>
                <label htmlfor="typ-wlosow" class="label-produkt">Typ włosów: </label>
                <select id="typ-produktu" name="typ-produktu" className="filter-select">
                  <option value="">Wszystkie</option>
                  <option value="niskoporowate">Niskoporowate</option>
                  <option value="srednioporowate">Średnioporotwate</option>
                  <option value="wysokoporowate">Wysokoporowate</option>
                </select>
                
              </div>
              <button id="search" className="button2">Szukaj</button>
          </div>

          </div>
          </div>
    <table>
    <tbody>

    {products.map((produkty) => (
      <tr key={produkty.id_produktu}>
        <td><img alt="zdjprod" src={`/images/products//${produkty.id_produktu}.png`} /></td>
        <td><Link href={`/offers//${produkty.id_produktu}`} passHref><h2>{produkty.nazwa}</h2></Link></td>
        <td>{produkty.firma.nazwa_firmy}</td>
      </tr>
    ))}
    </tbody>
  </table>
  </div>
  </div>
  </div>
  </div>
  )
}

export async function getServerSideProps() {
  const products= await prisma.produkty.findMany({
    include: {
      firma: true, 
    },
  })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
