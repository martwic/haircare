import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { getSession } from '@/server/auth';
import { prisma } from '@/server/db/client';
import EditProduct from '@/components/editproduct';


const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.post('./api/db/createuser', {imie, nazwisko, login, email,  haslo} )
  console.log(res.data)
  if(res.status==202){
    window.alert("Na taki email istnieje już konto");
    location.reload()
  }
  else{
    window.location = '/account'
  }
};

export default function Home({products, amount, rate, session}) {
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
        {session && session.user.email=="admin@haircare.pl" &&
        <><EditProduct data={{
                            productId1: produkty.id_produktu,
                            name1: produkty.nazwa,
                            companyId1: produkty.firma.id_firmy,
                            hairType1: produkty.typ_wlosa.id_typu,
                            description1: produkty.opis,
                            categoryId1: produkty.kategoria.id_kategorii,
                            ingredients1: produkty.sklad,
                      }}/></>}
        <img alt="zdjprod" src={`/images/products//${produkty.id_produktu}.png`} />
        <h2>{produkty.nazwa}</h2>
        {produkty.firma.nazwa_firmy}
        <h4>Opis:</h4>
        {produkty.opis}
        <h4>Skład:</h4>
        {produkty.sklad}
        <h4>Ocena:</h4>
        {rate.ocena_avg}(liczba ocen: {amount})
        {session &&
        <form onSubmit={handleSubmit} method='post'>
        <div className="stars">
        <div className="rate">
                                    <input type ="hidden" name="prodid" value=""/>
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label htmlFor="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" />
                                    <label htmlFor="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3" />
                                    <label htmlFor="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2" />
                                    <label htmlFor="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label htmlFor="star1" title="text">1 star</label>
                                  </div>
                                  </div>
                                  </form>}
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
  const products= await prisma.produkty.findMany({
    include: {
      firma: true, 
      typ_wlosa:true,
      kategoria: true,
    },
    where:{
      id_produktu: productId,
    },
  })
  const amount= await prisma.oceny_produktow.count({
    where:{
      produkt_id: productId,
    }
  })
  const rate = await prisma.oceny_produktow.aggregate({
    _avg:{
      ocena:true,
    },
    where:{
      produkt_id: productId,
    }
  })
  if(session){

  }

  return {
    props: {
      session,
      products: JSON.parse(JSON.stringify(products)),
      amount: JSON.parse(JSON.stringify(amount)),
      rate: JSON.parse(JSON.stringify(rate)),

    },
  }
}

