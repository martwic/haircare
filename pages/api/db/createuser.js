import { prisma } from '/server/db/client'
import { compare, hash } from 'bcryptjs'
import { setSession } from '@/server/auth';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "POST":
      const { imie, nazwisko, login, email, haslo } = req.body;
      let id_k = await prisma.konta.count({
        where: {
          email: email,
        }
      })

      if (id_k == 0) {
        const haslo1 = await hash(haslo, 12)
        const newUer = await createAccount(login, email, haslo1)
        const id_q = await getIdByEmail(email)
        await createUser(id_q, imie, nazwisko)
        const user = { email: email };
        const session = { user };
        setSession(res, session);
        res.status(201).json(newUer)
      }
      else {
        res.status(202).end(`Email exists`)
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function getIdByEmail(email) {
  const konto = await prisma.konta.findFirst({
    where: {
      email: email,
    },
    select: {
      id_konta: true,
    },
  });
  return konto?.id_konta;
}

async function createAccount(login, email, haslo) {
  const konto = await prisma.konta.create({
    data: {
      login: login,
      email: email,
      haslo: haslo,
    },
  });
  return konto;
}

async function createUser(id, imie, nazwisko) {
  const uzytkownik = await prisma.uzytkownicy.create({
    data: {
      id_konta: id,
      imie: imie,
      nazwisko: nazwisko,
    },
  });
  return uzytkownik;
}