import Link from "next/link";

export function DiscoverSection() {
    return (
        <div className=" bg-gradient-to-tr to-gray-100 from-[#bbdeff]">
        <section className="mx-auto max-w-[100rem] pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-12 lg:pb-16">
          <div className="grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/fe57dd22-971f-45ee-a29e-67edfc155a08/2ec3c40e-79b2-47ed-973e-1840c749dc3f.png"
              width="550"
              height="550"
              alt="Hero Book"
              className="mx-auto aspect-square overflow-hidden rounded-sm object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover the Joy of Reading
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Explore our curated collection of books across a wide range of genres. Find your next literary adventure
                today.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/products"
                  className="inline-flex h-9 items-center justify-center rounded-sm bg-blue-700 hover:bg-blue-800 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Books
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex h-9 items-center justify-center rounded-sm border border-black text-black bg-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        </div>
    );
}