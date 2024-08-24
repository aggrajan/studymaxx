import { Button } from "../ui/button";

export function ConnectWithUs() {
    const iconSize = "w-[40px] md:w-[60px]"
    return (
        <div className="bg-gradient-to-tr to-gray-100 from-[#bbdeff]" >
        <section className="px-4 md:px-6 pt-6 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 pb-12 container max-w-[100rem]">
            <div className="flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2 mb-0 sm:mb-5 md:mb-8 lg:mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Connect With Us</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        These are some of our social media handles
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-20 max-w-[100rem]">
                    <div className="flex flex-col items-center gap-4">
                        <img src="/instagram.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/youtube.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/facebook.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/linkedIn.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/twitter.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/blog.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <img src="/mail-list.svg" className={iconSize} />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button className="bg-blue-700 hover:bg-blue-800">Connect</Button>
                    </div>
                </div>
            </div>
        </section></div>
    );
}