import { OrdersPage } from "@/components/component/orders-page";

export default function AllOrdersPage() {
    return <>
        <OrdersPage api={`/api/get-orders`} />
        </>;
}