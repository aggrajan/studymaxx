import { ItemCard } from "./item-card";

export function OtherProductsYouMayFindUseful() {
    return (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-24 lg:pt-32">
            <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Other Products You May Find Useful</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Discover our top-selling and most popular books across various genres.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {/* <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} /> */}
                    {/* <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} />
                    <ItemCard title="Mathematics by R.S. Aggarwal" authors={["R.S. Aggarwal"]} price={1499} cover={"/placeholder.svg"} /> */}
                </div>
            </div>
        </section>
    );
}