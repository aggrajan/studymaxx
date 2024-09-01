import { Order } from "@/model/Order";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Author } from "@/model/Authors";

export function OrderDetail(props: any) {
    const router = useRouter();
    const order: Order = props.order;

    function getDiscountedPrice(originalPrice: number, discount: number): number {
        return (originalPrice * (100 - discount)) / 100.0;
    }

    function getAuthors(authors: Author[] | undefined): string {
        if(authors ===  undefined) return "";
        const authorsName = authors.map((author) => author.name)
        return authorsName.join(", ");
    }

    return <>
        <div className="w-full bg-gray-100">
            <section className="mx-auto max-w-[100rem] px-4 md:px-6 py-8 pt-[55px]">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Order Details</h1>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <Card className="rounded-sm h-fit">
                    <CardHeader>
                        <CardTitle className="text-xl">Order #{order._id}</CardTitle>
                        <CardDescription className="text-lg">Order {order.orderStatus} on {order.updatedAt?.toString().slice(0, 10)}</CardDescription>
                    </CardHeader>
                        <CardContent className="relative grid gap-2">
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-500">Name</div>
                                <p className="text-sm">{order.name}</p>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-500">Email</div>
                                <p className="text-sm">{order.email}</p>
                            </div>
                            <div className="border border-gray-200 p-5 rounded-sm space-y-4 shadow-md">
                                <div className="grid gap-1">
                                    <div className="font-semibold text-gray-500">Address</div>
                                    <p className="text-sm">{order.address.address}</p>
                                </div>
                                {order.address.landmark && <div className="grid gap-1">
                                    <div className="font-semibold text-gray-500">Landmark</div>
                                    <p className="text-sm">{order.address.landmark}</p>
                                </div>}
                                {order.address.company && <div className="grid gap-1">
                                    <div className="font-semibold text-gray-500">Company</div>
                                    <p className="text-sm">{order.address.company}</p>
                                </div>}
                                <div>
                                    <div className="font-semibold text-gray-500">Name</div>
                                    <p className="text-sm">{order.address.name}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div>
                                        <div className="font-semibold text-gray-500">City</div>
                                        <p className="text-sm">{order.address.city}</p>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">State</div>
                                        <p className="text-sm">{order.address.state}</p>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">Pincode</div>
                                        <p className="text-sm">{order.address.pincode}</p>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">Contact</div>
                                        <p className="text-sm">{order.address.contact}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="min-w-[20rem]">
                        <h2 className="font-bold tracking-tighter text-2xl mb-3">You Purchased</h2>
                        <div className="flex flex-col gap-y-4 w-full mb-10">
                            {(order.numberOfItems > 0) ? order.products.map((item, index) => (
                            <div key={`hover_cart_element_${index}`} className="flex flex-row justify-start items-center gap-x-4 w-full">
                                
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        width={80}
                                        height={100}
                                        className="object-cover cursor-pointer"
                                        onClick={() => {router.push(`/products/${item.product._id}`)}}
                                    />
                                
                                <div onClick={() => {router.push(`/products/${item.product._id}`)}} className="cursor-pointer w-full">
                                <h3 className="truncate-text font-semibold text-md w-full">{(item.product.title)}</h3>
                                <Separator className="w-full mt-2 mb-1" />
                                <p className="truncate-text text-muted-foreground text-xs w-full">{getAuthors(item.product.authors)}</p>
                                <div className="flex justify-start items-center gap-2">
                                    {(item.product && item.product.discount && (item.product.discount > 0)) ? <div className="text-md md:text-lg font-semibold text-primary">&#8377;{getDiscountedPrice(item.product.price, item.product.discount).toFixed(0)}</div> : null}
                                    <div className={`${(item.product && item.product.discount && (item.product.discount > 0)) ? "text-xs md:text-sm font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{item.product.price.toFixed(0)}</div>
                                    {(item.product && item.product.discount && (item.product.discount > 0)) ? <Badge variant="default" className="text-xs scale-[55%] md:scale-75 lg:scale-75">
                                    {(item.product.discount).toFixed(0)}% OFF
                                    </Badge> : null}
                                    <Badge className="text-md scale-[55%] md:scale-75 lg:scale-75 -ml-4">Qty: {item.quantity}</Badge>
                                </div>
                                </div>
                            </div>
                            ))

                            : <div className="flex justify-center items-center">
                            Your cart is empty
                            </div>}
                        </div>
                        <div className="bg-gray-200 border-2 border-gray-400 p-6 rounded-lg h-fit">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="grid gap-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>&#8377;{order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>&#8377;{order.numberOfItems > 0 ? order.shipping.toFixed(2): 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span>-&#8377;{order.numberOfItems > 0 ? order.discount.toFixed(2) : 0}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>&#8377;{(order.total).toFixed(2)}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    </>;
}