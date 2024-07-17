import { Footer } from "@/components/component/footer";
import { FrequentlyAskedQuestions } from "@/components/component/frequently-asked-questions";
import { NavBar } from "@/components/component/nav-bar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function FAQ() {
    return (
        <>
            <NavBar />
            <Breadcrumb className="px-4 lg:px-6 mt-16 mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Frequently Asked Questions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <FrequentlyAskedQuestions />
            <Footer />
        </>
    );
}