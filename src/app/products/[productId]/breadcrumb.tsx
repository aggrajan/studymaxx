"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useAppSelector } from "@/lib/hooks"
import { Book } from "@/model/Books"

export function BreadCrumb({ book }: {book: Book}) {
    function getTruncatedTitle(title: string): string {
        return title.length > 50 ? title.substring(0, 50) + "..." : title;
      }
    const categories = useAppSelector((state) => state.searchAndFilter.filters.categorie)
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
            <BreadcrumbLink href="/products">{book.category}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbPage>{getTruncatedTitle(book.title)}</BreadcrumbPage>
        </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}