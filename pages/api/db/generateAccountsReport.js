import { prisma } from '/server/db/client'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      const { startDate, endDate } = req.body;
      const result = await countRegistrations(startDate, endDate)
      res.status(201).json(result)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function countRegistrations(startDate, endDate) {

  const registrations = await prisma.konta.count({
    where: {
      data_rejestracji: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  return registrations;
}
