import Link from "next/link"

export function AboutUsMain() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary py-20 md:py-32">
        <div className="mx-auto px-4 md:px-6 container max-w-[100rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
                Discover the Joy of Mathematics
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground">
                Explore our curated collection of mathematics books for all levels.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 border-black text-black bg-gray-300 hover:bg-gray-600 hover:text-white"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
            <div className="hidden md:block">
              <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/fe57dd22-971f-45ee-a29e-67edfc155a08/2ec3c40e-79b2-47ed-973e-1840c749dc3f.png" alt="Mathematics Books" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-[#edf6ff]">
        <div className="mx-auto px-4 md:px-6 container max-w-[100rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/fe57dd22-971f-45ee-a29e-67edfc155a08/2ec3c40e-79b2-47ed-973e-1840c749dc3f.png" alt="About Us" className="rounded-lg mx-auto" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
              <p className="text-muted-foreground">
                At our e-commerce store, we are passionate about mathematics and believe in the power of education. Our
                mission is to provide high-quality mathematics books that inspire and empower learners of all ages and
                skill levels.
              </p>
              <p className="text-muted-foreground">
                Founded in 2015, our company has grown to become a trusted source for mathematics enthusiasts around the
                world. We carefully curate our selection of books, ensuring that each title offers unique insights and
                valuable learning opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
