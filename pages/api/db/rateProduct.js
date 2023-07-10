import { prisma } from '/server/db/client'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      const { productId, rating, userId } = req.body;
      const upUser = await updateRate(productId, rating, userId)
      res.status(201).json(upUser)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function updateRate(productId, rating, userId) {
  const isRate = await prisma.oceny_produktow.findFirst({
    select: {
      id_oceny: true
    },
    where: {
      produkt_id: productId,
      uzytkownicy: {
        id_konta: userId,
      }
    },
  })
  console.log(isRate)
  if (!isRate) {
    const updateRate = await prisma.oceny_produktow.create({
      data: {
        ocena: rating,
        produkt_id: productId,
        uzytkownik_id: userId,
      },
    })
  }
  else {
    const updateRate = await prisma.oceny_produktow.update({
      where: {
        id_oceny: isRate.id_oceny
      },
      data: {
        ocena: rating,
      },
    })
  }

  return updateRate;
}
