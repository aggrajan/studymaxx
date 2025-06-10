"use client"
import { Separator } from "../ui/separator";

export function OurMission() {
    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32 mb-24">
            <div className="flex flex-col items-center justify-center space-y-36 px-6 md:px-12 text-center">
                <div className="max-w-[100rem]  space-y-2">
                    {/* <p className="max-w-4xl text-muted-foreground md:text-xl">
                        Mission
                    </p> */}
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl max-w-4xl">Read. Succeed. Achieve.</h2>
                </div>
                <div className="max-w-[100rem] flex flex-col lg:flex-row gap-4">
                    <div className="min-w-80 text-black md:text-xl underline underline-offset-4">
                        Our Mission
                    </div>
                    <Separator orientation="vertical" className="mx-2"></Separator>
                    <div className="flex flex-col justify-start items-center gap-4 text-justify md:text-lg text-slate-600">
                        <div>
                            We, at STUDYMAXX, aim to bring out books and publications which shall serve as true guides and torchbearers for students. Our team works under the expert supervision of experienced authors who are masters in their respective fields and subjects. We put in dedicated efforts and ample time into making our works as much error free as possible so that our end-users get to use products with a high degree of accuracy and perfection.
                        </div>
                        <div>
                            We believe that quality education is the cornerstone of personal and professional growth. At the heart of our mission lies a commitment to educational excellence. We are passionate about education and dedicated to providing exceptional service, ensuring that every customer finds the perfect book to meet their needs. Together, we can create a brighter future through the power of learning.
                        </div>
                        {/* <div>
                            In addition to providing easy access to these essential educational tools, we are also committed to fostering a community of learners and educators. We aim to create a space where readers can connect, share insights, and support one another in their educational journeys. Through our blog, newsletters, and social media channels, we will offer tips, study guides, and the latest updates on new releases and educational trends, ensuring that our customers stay informed and inspired.
                        </div>
                        <div>
                            Ultimately, our mission is to honor the legacy of R.S. Aggarwal by making his work accessible to a global audience, empowering individuals with the knowledge and skills they need to succeed. We are passionate about education and dedicated to providing exceptional service, ensuring that every customer finds the perfect book to meet their needs. Together, we can create a brighter future through the power of learning.
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}