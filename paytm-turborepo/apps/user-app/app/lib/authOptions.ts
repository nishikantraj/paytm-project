import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { prisma } from "@repo/db";

const SALT_ROUND = 10;
export const authOptions = {
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
                            password: hashedPassword
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
    
}