import { ExploreBooks } from "@/components/component/explore-books";
import { Footer } from "@/components/component/footer";
import { NavBar } from "@/components/component/nav-bar";
import { ProductsPage } from "@/components/component/products";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function Products(){
    return (
        <>
            <NavBar />
            <Breadcrumb className="px-4 lg:px-6 mt-16 mb-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* <ExploreBooks /> */}
            <ProductsPage />
            <Footer />
        </>
    );
}