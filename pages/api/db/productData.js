import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const response = await getCompanyData()
        res.status(201).json(response)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function getCompanyData() {
    const company = await prisma.firma.findMany({
      select: {
        id_firmy: true,
        nazwa_firmy: true,
      },
      orderBy: {
        nazwa_firmy: 'asc',
      },
    })
    const hair = await prisma.typ_wlosa.findMany({
      select: {
        id_typu: true,
        nazwa_typu: true,
      },
    })
    const category = await prisma.kategoria.findMany({
      select: {
        id_kategorii: true,
        nazwa_kategorii: true,
      },
    })
    const type = await prisma.typ.findMany({
      select: {
        id_typu: true,
        nazwa_typu: true,
      },
    })
    return{
        company: JSON.parse(JSON.stringify(company)),
        hair: JSON.parse(JSON.stringify(hair)),
        category: JSON.parse(JSON.stringify(category)),
        type: JSON.parse(JSON.stringify(type))
    }
  }
