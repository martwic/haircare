import { prisma } from '/server/db/client'
import { compare, hash } from 'bcryptjs'

export default async function handler(req, res) {
    const { method } = req
    const jwt = require('jsonwebtoken');
    switch (method) {
        case "POST":
            const { email, haslo } = req.body;
            var haslo2
            var user1
            const user = await prisma.$queryRaw`SELECT * FROM konta WHERE email =${email}`
            {user.map((konta) =>(
                user1 = konta.id_konta
              ))}
            if(!user1){
                res.status(203).end(`Wrong email`)
            }
            else{
                {user.map((konta) =>(
                    haslo2 = konta.haslo
                ))}
                const match = await compare(haslo, haslo2)
                if(match){
                    const token = jwt.sign({ userId: email }, 'key', { expiresIn: '1h' });
                    res.json({ token })
                }
                else{
                    res.status(204).end(`Wrong password`)
                }
            }
        break
        default:
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  