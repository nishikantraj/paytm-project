import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where:{
            id: 111111
        },
        update:{},
        create:{
            number:"23948728347",
            password: await bcrypt.hash("password", 10),
            name: "Alice",
            email: "alice@gmail.com",
            balance:{
                create:{
                    amount:2000,
                    locked:0
                }
            },
            onRampTransations:{
                create:{
                    startTime: new Date(),
                    status:"Success",
                    amount: 2000,
                    token: "token_1",
                    provider: "HDFC Bank"
                }
            }
        }
    });

    const bob = await prisma.user.upsert({
        where:{
            id: 22222
        },
        update:{},
        create:{
            number:"356765",
            password: await bcrypt.hash("pass", 10),
            name: "Bob",
            email: "bob@gmail.com",
            balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },
            onRampTransations:{
                create:{
                    startTime: new Date(),
                    status:"Failure",
                    amount: 20000,
                    token: "token_2",
                    provider: "HDFC Bank"
                }
            }
        }
    });
    console.log({alice, bob});    
}

main().then(async()=>{
    prisma.$disconnect();
}).catch(async(e)=>{
    console.log(e);
    prisma.$disconnect();
    process.exit(1);
})