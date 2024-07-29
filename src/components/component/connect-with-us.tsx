import { Button } from "../ui/button";

export function ConnectWithUs() {
    return (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-24 lg:pt-32 mb-24">
            <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Connect With Us</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        These are some of our social media handles
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7  gap-20">
                    <div className="flex flex-col gap-4">
                        <img src="/instagram.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/youtube.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/facebook.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/linkedIn.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/twitter.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/blog.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img src="/mail-list.svg" className="w-[80px]" />
                        <div className="text-sm text-gray-700" >@handle</div>
                        <Button>Connect</Button>
                    </div>
                    {/* <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} /> */}
                </div>
            </div>
        </section>
    );
}