import { prisma } from '/server/db/client'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      const { productName, company, hairType, description, category, type, ingredients } = req.body;
      const result = await insertProduct(productName, company, hairType, description, category, type, ingredients)
      res.status(201).json(result)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function insertProduct(productName, company, hairType, description, category, type, ingredients) {

  const addProduct = await prisma.produkty.create({
    data: {
      nazwa: productName,
      firma: { connect: { id_firmy: parseInt(company) } },
      typ_wlosa: { connect: { id_typu: parseInt(hairType) } },
      opis: description,
      kategoria: { connect: { id_kategorii: parseInt(category) } },
      sklad: ingredients,
    },
  })
  if (!type) {
    type = null
  }
  else {
    type = parseInt(type)
    const addProduct = await prisma.produkty.update({
      where: {
        nazwa: productName
      },
      data: {
        typ: { connect: { id_typu: type } },
      },
    })
  }
  return addProduct;
}
