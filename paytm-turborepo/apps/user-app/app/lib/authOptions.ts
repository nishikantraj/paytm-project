import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import { prisma } from "@repo/db";

const SALT_ROUND = 10;
export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                phone: {label: "Phone number", type: "text", placeholder: "1231231231", required: true},
                password: {label:"Password", type:"password", placeholder:"XXXXXX"},
            },
            async authorize(credentials){
                const salt = await bcrypt.genSalt(SALT_ROUND);
                const hashedPassword = await bcrypt.hash(credentials?.password || "", salt);

                const existingUser = await prisma.user.findFirst({
                    where:{
                        number:credentials?.phone || ""
                    }
                });
                
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials?.password || "", existingUser.password);
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                }
                
                try{
                    const user = await prisma.user.create({
                        data:{
                            number:credentials?.phone || "",
                            password: hashedPassword,
                            balance: {
                                create: {
                                    amount: 0,
                                    locked: 0
                                }
                            }
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                }
                catch(e){
                    console.log(e);
                }
                return null
            }
        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks:{
        async session({token, session}){
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session
        }
    }
}
