"use client"
import { Card, CardContent } from "../ui/card"
import { Separator } from "../ui/separator";

export function OurMission() {
    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32 mb-24">
            <div className="container flex flex-col items-center justify-center space-y-36 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <p className="max-w-4xl text-muted-foreground md:text-xl">
                        Mission
                    </p>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl max-w-4xl">Your long mission text goes here</h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="min-w-96 text-black md:text-xl underline underline-offset-4">
                        Our Mission
                    </div>
                    <Separator orientation="vertical" className="mx-2"></Separator>
                    <div className="flex flex-col justify-start items-center gap-4 text-justify md:text-lg text-slate-600">
                        <div>
                        Our mission is to be the premier destination for all enthusiasts of R.S. Aggarwal’s literary works, providing unparalleled access to his extensive range of books. We are dedicated to bringing the wisdom, knowledge, and expertise of R.S. Aggarwal into the hands of students, educators, and lifelong learners around the world. Whether it&apos;s mathematical concepts, competitive exam preparation, or advanced problem-solving techniques, our e-commerce platform ensures that every individual can easily find and purchase these invaluable resources.
                        </div>
                        <div>
                        At the heart of our mission lies a commitment to educational excellence. We believe that quality education is the cornerstone of personal and professional growth, and R.S. Aggarwal&apos;s books are renowned for their clarity, depth, and practical approach to learning. By offering these books exclusively, we aim to support students in achieving academic success and reaching their full potential. Our platform is designed to be user-friendly, ensuring a seamless shopping experience where customers can quickly locate the titles they need, read reviews, and make informed purchasing decisions.
                        </div>
                        <div>
                        In addition to providing easy access to these essential educational tools, we are also committed to fostering a community of learners and educators. We aim to create a space where readers can connect, share insights, and support one another in their educational journeys. Through our blog, newsletters, and social media channels, we will offer tips, study guides, and the latest updates on new releases and educational trends, ensuring that our customers stay informed and inspired.
                        </div>
                        <div>
                        Ultimately, our mission is to honor the legacy of R.S. Aggarwal by making his work accessible to a global audience, empowering individuals with the knowledge and skills they need to succeed. We are passionate about education and dedicated to providing exceptional service, ensuring that every customer finds the perfect book to meet their needs. Together, we can create a brighter future through the power of learning.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}