import { getSession } from '@/server/auth';
import { prisma } from '@/server/db/client';
import EditProduct from '@/components/editproduct';
import React, { useState } from "react";
import axios from 'axios';
import ReactStars from 'react-stars'

export default function Home({ products, amount, rate, session, id, userId, fav }) {
  const productId = id
  var prevIsLiked=0
  if(fav>0){
    prevIsLiked=1
  }
  console.log(prevIsLiked)
  const [isLiked, setIsLiked] = useState(prevIsLiked);
  userId=userId.id_konta
  var rating=0
  const handleRating = (newRating) => {
    rating=newRating
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('../api/db/rateProduct', { productId, rating, userId })
    location.reload()
  }
  const handleLikeClick = async(e) => {
    e.preventDefault();
    setIsLiked((prevIsLiked) => !prevIsLiked);
    const res = await axios.post('../api/db/favourite', { productId, userId, fav })
    fav=prevIsLiked
  };
  return (
    <div className='bodyLog'>
      <div className='mainLog'>
        <div className="sectionLog">
          <div className="boxOfOffers" >
          
            <table>
              <tbody>
                {products.map((produkty) => (
                  <tr key={produkty.id_produktu}>
                    <td>
                      {session && session.user.email == "admin@haircare.pl" &&
                        <><EditProduct data={{
                          productId1: produkty.id_produktu,
                          name1: produkty.nazwa,
                          companyId1: produkty.firma.id_firmy,
                          hairType1: produkty.typ_wlosa.id_typu,
                          description1: produkty.opis,
                          categoryId1: produkty.kategoria.id_kategorii,
                          ingredients1: produkty.sklad,
                        }} /></>}
                        <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}></button><br/>
                      <img alt="zdjprod" src={`/images/products//${produkty.id_produktu}.png`} />
                      <h2>{produkty.nazwa}</h2>
                      {produkty.firma.nazwa_firmy}
                      <h4>Opis:</h4>
                      {produkty.opis}
                      <h4>Skład:</h4>
                      {produkty.sklad}
                      <h4>Ocena:</h4>
                      <h3>{amount>0 && <>{(rate._avg.ocena).toFixed(2)}/5</> }(liczba ocen: {amount})</h3>
                      {session && session.user.email != "admin@haircare.pl" &&
                        <>
                          <div className="stars">
                            <div className="rate">
                              <ReactStars onChange={handleRating}
                                count={5}
                                size={36}
                                half={false}
                                color2={'#ffd700'} />
                                <button className='button2' onClick={handleSubmit}>Oceń</button>  
                              </div></div>
                        </>}
                    </td>
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

export async function getServerSideProps(context) {
  const session = getSession(context.req);
  var productId = parseInt(context.params.id)
  const products = await prisma.produkty.findMany({
    include: {
      firma: true,
      typ_wlosa: true,
      kategoria: true,
    },
    where: {
      id_produktu: productId,
    },
  })
  const amount = await prisma.oceny_produktow.count({
    where: {
      produkt_id: productId,
    }
  })
  const rate = await prisma.oceny_produktow.aggregate({
    _avg: {
      ocena: true,
    },
    where: {
      produkt_id: productId,
    }
  })
  var userId
  var fav=0
  if (!session) {}
  else{
    const { user } = session;
    userId = await prisma.konta.findFirst({
      select: {
        id_konta:true
      },
      where: {
        email: user.email,
      },
    })
    fav = await prisma.ulubione.count({
      where: {
        id_produktu:productId,
        id_konta:userId.id_konta,}
    });
  }

  return {
    props: {
      session,
      products: JSON.parse(JSON.stringify(products)),
      amount: JSON.parse(JSON.stringify(amount)),
      rate: JSON.parse(JSON.stringify(rate)),
      id: productId,
      userId: userId,
      fav: fav,
    },
  }
}

