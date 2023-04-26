import { prisma } from '/server/db/client'

export default async function handler(req, res) {
    const { login, email, haslo } = req.query;
    typ_konta_id=2;
    try {
        const newUer = await prisma.konta.create({
            data: {
                login,
                email,
                haslo,
                typ_konta_id,
            },
            });

        res.json({ user: newUer, error: null });
    } catch (error) {
        res.json({ error: error.message, user: null });
    }
}