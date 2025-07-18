import Link from "next/link";

export function DiscoverSection() {
    return (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 bg-no-repeat relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.webp')] opacity-10"></div>
        <section className="relative mx-auto max-w-[100rem] pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 z-10 overflow-hidden">
          <div className="absolute top-[10%] md:top-[15%] right-[20%] md:right-[30%] w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob-3 z-0 opacity-60"></div>
          <div className="absolute top-[20%] left-[15%] md:left-[20%] w-48 md:w-60 h-48 md:h-60 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob-1 z-0 opacity-60"></div>
          <div className="absolute bottom-[5%] md:top-[45%] right-[15%] w-44 md:w-72 h-44 md:h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob-2 z-0 opacity-60"></div>
          <div className="absolute bottom-[10%] md:bottom-[15%] left-[15%] md:left-[5%] w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob-3 z-0 opacity-60"></div>
          <div className="relative grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl transform rotate-3 opacity-50"></div>
              <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/fe57dd22-971f-45ee-a29e-67edfc155a08/2ec3c40e-79b2-47ed-973e-1840c749dc3f.png"
              width="550"
              height="550"
              alt="Hero Book"
              className="relative mx-auto aspect-square overflow-hidden rounded-2xl object-cover object-center sm:w-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnMaxx. PrepMaxx. ScoreMaxx.
              </h1>
              <p className="text-gray-600 md:text-xl z-10 leading-relaxed">
                Explore our curated collection of books across a wide range of genres. Find your next literary adventure
                today.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 z-10"
                  prefetch={false}
                >
                  Shop Books
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-gray-100 hover:border-gray-400 px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
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