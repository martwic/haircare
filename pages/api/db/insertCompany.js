import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { companyName } = req.body;
        const result = await insertCompany(companyName)
        res.status(201).json(result)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function insertCompany(cName) {
    const addCompany = await prisma.firma.create({
      data: {
        nazwa_firmy: cName,
      },
    })
    return addCompany;
  }
