import { Skeleton } from "../ui/skeleton";
import { SkeletonProductDetails } from "./skeleton-product-details";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SkeletonTabView } from "./skeleton-tabs-view";
import { SkeletonReviews } from "./skeleton-reviews";


export function SkeletonProductPage(props: any) {
    const { isModal } = props;

    return (
        <>
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
                        <BreadcrumbLink><Skeleton className="w-32 h-5" /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage><Skeleton className="w-32 h-5" /></BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SkeletonProductDetails isModal={isModal} />
            <SkeletonTabView />
            <SkeletonReviews />
        </>
    );
}