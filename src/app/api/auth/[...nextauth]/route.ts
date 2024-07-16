import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "email"},
                password: {label: "Password", type: "password", placeholder: "password"}
            },
            async authorize(credentials): Promise<any> {
                try {
                    await dbConnect();
            
                    const reqBody = credentials!;
                    const { email, password } = reqBody;
                    const currentUser = await UserModel.findOne({email});
                    if(!currentUser) {
                        return new Error("No user exist with this email id and password")
                    }

                    if(!currentUser.isVerified) {
                        return new Error("Please verify your account first.");
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password!);
                    if(!isPasswordCorrect) {
                        return new Error("Password is incorrect");
                    }

                    const tokenData = {
                        id: currentUser._id
                    }
                    const expiryDate = new Date();
                    expiryDate.setHours(expiryDate.getHours() + 1);
                    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1h'});
                    const response = currentUser;

                    cookies().set("token", token, {
                        httpOnly: true,
                        expires: expiryDate
                    });

                    return response;
                } catch (error: any) {
                    return new Error("Credentials Error: ", error.message);
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if(account?.provider === "credentials") {
                try {
                    const token = cookies().get("token")?.value || "";
                    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
                    return decodedToken ? true : false;
                } catch(error: any) {
                    return false;
                }
            }
            
            await dbConnect();
            if(!profile?.email) {
                throw new Error("No Profile");
            }

            const { email } = profile;
            let currentUser = await UserModel.findOne({email});
            if(!currentUser) {
                try{
                    const user = new UserModel({
                        name: profile.name,
                        email: profile.email,
                        picture: profile.picture,
                        isVerified: profile.email_verified
                    });
                    currentUser = await user.save();
                } catch(error: any) {
                    console.error("Google Authentication Error: ", error);
                    
                }
            }

            const tokenData = {
                id: currentUser?._id
            }
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn: '1h' });
            const response = true;

            cookies().set("token", token, {
                httpOnly: true,
                expires: expiryDate
            });

            return response;
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id?.toString();
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            } 

            return session;
        },
        async jwt({ user, token }) {
            if(user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }

            return token;
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }