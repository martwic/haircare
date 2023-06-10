import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { id_k, result } = req.body;
        const num=parseInt(id_k, 10)
        const num2=parseInt(result, 10)
        const upUser = await updateHairData(num, num2)
        res.status(201).json(upUser)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function updateHairData(id_k, result) {
    const updateHair = await prisma.uzytkownicy.update({
      where: {
        id_konta: id_k,
      },
      data: {
        typ_wlosa_id: result,
      },
    })
    return updateHair;
  }
