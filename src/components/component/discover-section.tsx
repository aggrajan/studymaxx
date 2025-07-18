import Link from "next/link";

export function DiscoverSection() {
    return (
        <div className="bg-[#d9edff] bg-no-repeat">
        <section className="relative mx-auto max-w-[100rem] pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-12 lg:pb-16 z-10 overflow-hidden">
          <div className="absolute top-[10%] md:top-[15%] right-[20%] md:right-[30%] w-28 md:w-40 h-28 md:h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-sm animate-blob-3 z-0"></div>
          <div className="absolute top-[20%] left-[15%] md:left-[20%] w-44 md:w-52 h-44 md:h-52 bg-blue-300 rounded-full mix-blend-multiply filter blur-sm animate-blob-1 z-0"></div>
          <div className="absolute bottom-[5%] md:top-[45%] right-[15%] w-40 md:w-60 h-40 md:h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-sm animate-blob-2 z-0"></div>
          <div className="absolute bottom-[10%] md:bottom-[15%] left-[15%] md:left-[5%] w-28 md:w-32 h-28 md:h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-sm animate-blob-3 z-0"></div>
          <div className="relative grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/fe57dd22-971f-45ee-a29e-67edfc155a08/2ec3c40e-79b2-47ed-973e-1840c749dc3f.png"
              width="550"
              height="550"
              alt="Hero Book"
              className="mx-auto aspect-square overflow-hidden rounded-sm object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl z-10">
                LearnMaxx. PrepMaxx. ScoreMaxx.
              </h1>
              <p className="text-muted-foreground md:text-xl z-10">
                Explore our curated collection of books across a wide range of genres. Find your next literary adventure
                today.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/products"
                  className="inline-flex h-9 items-center justify-center rounded-sm bg-blue-700 hover:bg-blue-800 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10"
                  prefetch={false}
                >
                  Shop Books
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex h-9 items-center justify-center rounded-sm border border-black text-black bg-white hover:bg-gray-600 hover:text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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