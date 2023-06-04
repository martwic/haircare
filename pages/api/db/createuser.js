import { prisma } from '/server/db/client'
import { compare, hash } from 'bcryptjs'

export default async function handler(req, res) {
    const { method } = req
    
    switch (method) {
        case "POST":
    const { imie, nazwisko, login, email, haslo } = req.body;
    var id_k
    const previousMail = await prisma.$queryRaw`SELECT * FROM konta WHERE email =${email}`
    {previousMail.map((konta) =>(
      id_k = konta.id_konta
    ))}
    if(!id_k){

      
    console.log(login);
        const haslo1 = await hash(haslo, 12)
        const newUer = await prisma.$queryRaw`INSERT INTO konta (login, email, haslo) VALUES (${login}, ${email}, ${haslo1});`
        const id_q = await prisma.$queryRaw`SELECT id_konta FROM konta WHERE email =${email}`
        {id_q.map((konta) =>(
          id_k = konta.id_konta
        ))}
        await prisma.$queryRaw`INSERT INTO uzytkownicy (id_konta, imie, nazwisko) VALUES (${id_k}, ${imie}, ${nazwisko})`
        
        res.status(201).json(newUer)
      }
      else{
        res.status(202).end(`Email exists`)
      }
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  