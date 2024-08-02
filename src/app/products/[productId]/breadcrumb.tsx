"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export function BreadCrumb({ title, category }: {title: string, category: string}) {
    function getTruncatedTitle(title: string): string {
        return title.length > 50 ? title.substring(0, 50) + "..." : title;
      }
    return <Breadcrumb className="px-4 lg:px-6 mt-16">
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
            <BreadcrumbLink href="/products">{category}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbPage>{getTruncatedTitle(title)}</BreadcrumbPage>
        </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}