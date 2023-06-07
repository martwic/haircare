import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

export default function Home({products}) {
  return (
    <div className='bodyLog'>
      <div className='mainLog'>
      <div className="sectionLog">
                <div className="boxOfProducts" >
    <table>
    <tbody>
    {products.map((produkty) => (
      <tr key={produkty.id_produktu}>
        <td><img alt="zdjprod" src={`/images/products//${produkty.id_produktu}.png`} />
        <h2>{produkty.nazwa}</h2>
        {produkty.firma.nazwa_firmy}
        <h4>Opis:</h4>
        {produkty.opis}
        <h4>Skład:</h4>
        {produkty.sklad}
        <h4>Ocena:</h4>
        *****
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


export async function getServerSideProps(contex) {
  var productId = parseInt(contex.params.id)
  const products= await prisma.produkty.findMany({
    include: {
      firma: true, 
    },
    where:{
      id_produktu: productId,
    },
  })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

