import { prisma } from '/server/db/client'
import Link from 'next/link';
import React, { useState } from "react";

export default function Home({ products }) {
  const [category, setcategory] = useState('');
  const [type, settype] = useState('');

  /*
  <input type="search" id="search-input" placeholder="Wyszukaj nazwę produktu..." className='search-box' />
  */

  return (
    <div className='bodyLog'>
      <div className='mainLog'>
        <div className="sectionLog">
          <div className="boxOfProducts">
            <div className='search-bar'>
              <div id="search-container">
                <form  name='searchBar'>
                  <div className='select-search'>
                    
                    <div className='label-select-container'>
                      <label htmlfor="typ-produktu" className="label-produkt">Kategorie produktu: </label>
                      <select id="typ-produktu" name="typ-produktu" className="filter-select" onChange={(e) => setcategory(e.target.value)}>
                        <option value="">Wszystkie</option>
                        <option value="1">Szampon</option>
                        <option value="2">Odżywka</option>
                        <option value="3">Wcierka</option>
                        <option value="4">Serum</option>
                        <option value="5">Peeling</option>
                      </select>
                    </div>
                    <div className='label-select-container'>
                      <label htmlfor="typ-wlosow" class="label-produkt">Typ włosów: </label>
                      <select id="typ-wlosow" name="typ-wlosow" className="filter-select" onChange={(e) => settype(e.target.value)}>
                        <option value="">Wszystkie</option>
                        <option value="1">Niskoporowate</option>
                        <option value="2">Średnioporotwate</option>
                        <option value="3">Wysokoporowate</option>
                      </select>
                    </div>
                    <Link href={`/products?category=${category}&type=${type}`}><input value="Szukaj" type="submit" id="search" className="button2" /></Link>
                </div>
                </form>
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
  /*
  const products = await prisma.produkty.findMany({
    include: {
      firma: true,
    },
    where:{
      typ_wlosa_id: type,
      kategoria_id: category,
    }
  })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },}*/
  


export async function getServerSideProps(context) {
  const { category, type } = context.query;
  if(!type && !category){
    const products = await prisma.produkty.findMany({
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
  else if(!type && category){
    const products = await prisma.produkty.findMany({
      include: {
        firma: true,
      },
      where:{
        kategoria_id: parseInt(category),
      }
    })
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },}
  }
  else if(!category){
    const products = await prisma.produkty.findMany({
      include: {
        firma: true,
      },
      where:{
        typ_wlosa_id: parseInt(type),
      }
    })
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },}
  }
  else{
    const products = await prisma.produkty.findMany({
      include: {
        firma: true,
      },
      where:{
        typ_wlosa_id: parseInt(type),
        kategoria_id: parseInt(category),
      }
    })
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },}
  }

  
}
