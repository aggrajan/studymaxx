import { LoaderCircle } from "lucide-react"

export default function LoadingHome() {
    return <div className="mt-[55px] w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl">
        <LoaderCircle className="mr-2 h-7 w-7 duration-200 animate-spin"/> Loading...
    </div>
}