import { prisma } from '../server/db/client'
import Link from 'next/link';

export default function Home({products}){
  return (
    <div className='bodyLog'>
      <div className='mainLog'>
      <div className="sectionLog">
                <div className="boxOfProducts">
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
