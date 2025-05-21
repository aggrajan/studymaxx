import { getBook } from "@/app/apiCalls/callBook";
import { Book } from "@/model/Books";
import { Metadata } from "next";
import { ProductPageClient } from "@/components/client-only-components/product-page-component";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const book: Book | null = await getBook(params.productId);
  if (!book) {
    notFound();
  }
  return {
    title: book.title,
    description: "Checkout this amazing book on StudyMaxx",
    openGraph: {
      title: book.title,
      description: book.about[0],
      images: [book.image],
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.about[0],
      images: [book.image],
    },
  };
}

export default async function Product({ params }: ProductPageProps) {
    // const [book, setBook] = useState<Book>({"_id":"","title":" ","image":"/placeholder.svg","authors":[{"name":"-"}],"price":0,"level":"","subject":"","board":"","exam":"","keywords":[""],"language":"","isbn":"","number_of_pages":0,"year":0,"size":"","binding":"","category":"", "about": [""], "salient_features": [""], "useful_for": [""], "additional_support": [""]} as Book);
    const book: Book | null = await getBook(params.productId);
    if (!book) {
        notFound();
    }

   
    return <ProductPageClient book={book} />;
}

