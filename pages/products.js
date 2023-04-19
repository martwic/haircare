import { prisma } from '../server/db/client'

export default function Home({products}){
  return (
    <div className='bodyLog'>
      <div className='mainLog'>
      <div className="sectionLog">
                <div className="boxOfProducts">
    <table>
    {products.map((produkty) => (
      <tr key={produkty.id_produktu}>
        <td><img alt="zdjprod" src={`/images/products//${produkty.id_produktu}.jpg`} /></td>
        <td><h2>{produkty.nazwa}</h2></td>
        <td>{produkty.firma.nazwa_firmy}</td>
      </tr>
    ))}
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
