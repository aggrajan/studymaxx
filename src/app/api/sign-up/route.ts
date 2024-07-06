import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        await dbConnect();

        

        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if(existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "Username is already taken",
            }, {
                status: 500
            })
        }

        const existingUserByEmail = await UserModel.findOne({
            email: email
        });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        if(existingUserByEmail) {
            if(existingUserByEmail.isVerified) {
                
                return NextResponse.json({
                    success: false,
                    message: "User already exists with this email",
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = expiryDate
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            
            // add forgotPasswordCode and forgotPasswordCodeExpity
            
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,

            })

            await newUser.save();
        }

        
        // send Verfication Email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if(!emailResponse.success){
            
            return NextResponse.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500
            })
        }        

        return NextResponse.json({
            success: true,
            message: "User Registeration is successfull. Please verify email."
        }, {
            status: 200
        })
    } catch(error: any) {
        
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {
            status: 500
        })
    }

   
}