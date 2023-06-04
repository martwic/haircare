import { PrismaClient } from '@prisma/client'
import NextAuth from "next-auth"

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
    enableCache: true,
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
if (process.env.NODE_ENV !== 'deployment') global.prisma = prisma

