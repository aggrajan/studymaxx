import { WishlistPage } from "@/components/client-only-components/wishlist-page";
import { Footer } from "@/components/component/footer";
import { NavBar } from "@/components/component/nav-bar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Wishlist() {
    return <>
        <NavBar />
        <Breadcrumb className="px-4 lg:px-6 mt-16 mb-2">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Wishlist</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <WishlistPage />
        <Footer />
    </>
}