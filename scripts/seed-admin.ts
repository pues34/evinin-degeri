import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@evinin-degeri.com'
    const password = 'superadminpassword'

    const existingAdmin = await prisma.admin.findUnique({
        where: { email }
    })

    if (existingAdmin) {
        console.log(`Admin with email ${email} already exists.`)
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.admin.create({
        data: {
            email,
            password: hashedPassword,
            name: 'Super Admin'
        }
    })

    console.log(`Successfully seeded admin: ${admin.email}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
