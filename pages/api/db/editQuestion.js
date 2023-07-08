import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { questionId, question } = req.body;
        const result = await updateQuestion(questionId, question)
        res.status(201).json(result)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  async function updateQuestion(questionId, question) {
    
    const updateQuestion = await prisma.pytania.update({
      where: {
        id_pytania: questionId,
      },
      data: {
        pytanie : question,
      },
    })
    return updateQuestion;
  }
