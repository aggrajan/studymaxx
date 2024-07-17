"use client"
import { Footer } from "@/components/component/footer";
import { LatestArrivals } from "@/components/component/latest-arrivals";
import { NavBar } from "@/components/component/nav-bar";
import { OtherProductsYouMayFindUseful } from "@/components/component/other-products-you-may-find-useful";
import { ProductDetails } from "@/components/component/product-details";
import { Reviews } from "@/components/component/reviews";
import { TabView } from "@/components/component/tab-view";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function Product() {
    return (
        <>
            <NavBar />
            <Breadcrumb className="px-4 lg:px-6 mt-16">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>The Alchemist</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ProductDetails isModal={false} />
            <TabView />
            <Reviews />
            <OtherProductsYouMayFindUseful />
            <LatestArrivals />
            <Footer />
        </>
    );
}