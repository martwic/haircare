import { prisma } from '/server/db/client'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      const { productId1, productName, company, hairType, description, category, ingredients } = req.body;
      const result = await updateProduct(productId1, productName, company, hairType, description, category, ingredients)
      res.status(201).json(result)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function updateProduct(productId1, productName, company, hairType, description, category, ingredients) {

  const updateProduct = await prisma.produkty.update({
    where: {
      id_produktu: productId1,
    },
    data: {
      nazwa: productName,
      firma: { connect: { id_firmy: parseInt(company) } },
      typ_wlosa: { connect: { id_typu: parseInt(hairType) } },
      opis: description,
      kategoria: { connect: { id_kategorii: parseInt(category) } },
      sklad: ingredients,
    },
  })
  return updateProduct;
}
