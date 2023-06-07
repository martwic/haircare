import { prisma } from '/server/db/client'
import { compare, hash } from 'bcryptjs'
import { setSession } from '@/server/auth';

export default async function handler(req, res) {
    const { method } = req
    const jwt = require('jsonwebtoken');
    switch (method) {
        case "POST":
            const { email, haslo } = req.body;
            var haslo2
            const user = await prisma.konta.findFirst({
          where: {
            email: email,
          },
        });
            if(!user){
                res.status(203).end(`Wrong email`)
            }
            else{
                haslo2=user.haslo
                const match = await compare(haslo, haslo2)
                if(match){
                    const user = { email: email };
                    const session = { user };
                    setSession(res, session);
                    res.status(200).end(`OK`)
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

  