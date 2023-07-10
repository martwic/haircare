import { prisma } from '/server/db/client'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      const { productId, userId, fav } = req.body;
      const upFav = await updateFav(productId, userId, fav)
      res.status(201).json(upFav)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function updateFav(productId, userId, fav) {
  if (fav) {
    const isRate = await prisma.ulubione.findFirst({
      select: {
        id_ulubionego: true,
      },
      where: {
        id_produktu: productId,
        id_konta: userId,
      },
    })
    const updateFav = await prisma.ulubione.delete({
      where: {
        id_ulubionego: isRate.id_ulubionego,
      },
    })
  }
  else {
    const updateFav = await prisma.ulubione.create({
      data: {
        produkty: {
          connect: {
            id_produktu: productId,
          }
        },
        konta: {
          connect: {
            id_konta: userId,
          }
        },
      },
    })
  }
  return updateFav;
}
