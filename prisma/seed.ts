import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const saltOrRounds = 10;
    const password = "Admin@123"
    const hash = await bcrypt.hash(password, saltOrRounds);
  const post1 = await prisma.user.create({data:{UserName:"admin" , Email:"admin@gmail.com" , Password:hash , IsAdmin:true}});
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });