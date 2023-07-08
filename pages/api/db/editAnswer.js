import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { answerId, answer } = req.body;
        const result = await updateAnswer(answerId, answer)
        res.status(201).json(result)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function updateAnswer(answerId, answer) {
    
    const updateAnswer = await prisma.odpowiedzi.update({
      where: {
        id_odpowiedzi: answerId,
      },
      data: {
        odpowiedz : answer,
      },
    })
    return updateAnswer;
  }
