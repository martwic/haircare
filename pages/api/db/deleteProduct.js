import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { productId } = req.body;
        const result = await deleteProduct( productId)
        res.status(201).json(result)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function deleteProduct( productId) {
    
    const deleteProduct = await prisma.produkty.delete({
      where: {
        id_produktu: productId,
      },
    })
    
    return deleteProduct;
  }
