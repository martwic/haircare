
/*
export default async function handler(req, res) {
    const { method } = req
  
    switch (method) {
      case "POST":
        const { language, code } = req.body
        const post = await prisma.post.create({
          data: {
            title,
            language,
            code,
          },
        })
        const { login, email, haslo, imie, nazwisko } = req.body
        const createUserAndAccount = await prisma.konta.uzytkownicy({
            data: {
              login,
              email,
              haslo,
              typ_konta_id:2,
              uzytkownicy: {
                create: [
                  { 
                    imie,
                    nazwisko,
                    typ_wlosa:0
                   }
                ],
              },
            },
          })
        res.status(201).json(post)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }*/