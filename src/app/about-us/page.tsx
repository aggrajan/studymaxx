import { AboutUsMain } from "@/components/component/about-us";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AboutUs() {
    return (
        <>
            <Breadcrumb className="px-4 lg:px-6 pt-16 pb-2 bg-primary">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-white hover:text-gray-300">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">About Us</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <AboutUsMain />
        </>
    );
}