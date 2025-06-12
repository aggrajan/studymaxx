import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import UserModel from "@/model/User";
import ResetPasswordMail from "../../emails/ResetPasswordMail";

export async function sendResetPassword(email: string, username: string, otp: string, forgotPasswordCodeExpiry: Date): Promise<ApiResponse> {
    try {
        await UserModel.findOneAndUpdate({
            username: username
        }, {
            $set: {
                forgotPasswordCode: otp,
                forgotPasswordCodeExpiry
            }
        })

        await resend.emails.send({
            from: 'studymaxx.in',
            to: email,
            subject: 'StudyMaxx | Verification Code',
            react: ResetPasswordMail({username, otp})
        })
        return {
            success: true,
            message: 'Verification Email sent successfully'
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {success: false, message: "Failed to send verification email"};
    }
}