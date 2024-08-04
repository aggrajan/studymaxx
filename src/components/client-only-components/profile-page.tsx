"use client";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Address } from "@/model/Address";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    function getFallBack() {
        if(user?.name) {
            return user.name.split(" ").reduce((prev, curr) => prev + curr[0], "")
        } else if(user?.username) {
            return user?.username.toUpperCase()[0];
        } else {
            return "User"
        }
    }
    return (
        <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
          <header className="flex items-center gap-4 mb-8">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.picture} alt="@shadcn" />
              <AvatarFallback>{getFallBack()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{user?.name ? user.name : user?.username}</h1>
              <p className="text-muted-foreground">{user?.username ? user.username : ""}</p>
            </div>
          </header>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <h2 className="text-lg font-semibold">Profile</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">Email</label>
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">Verification Status</label>
                  {user?.isVerified ? 
                  <div className="flex gap-2"><Badge className="w-[75px] text-sm bg-green-500 hover:bg-green-600">Verified</Badge>{user.isAdmin && <Badge className="w-[65px] text-sm bg-gray-700 hover:bg-gray-600" >Admin</Badge>}</div> : 
                  <p className="text-red-500">User is not verified. Please verify your account.</p>}
                </div>
              </div>
            </div>
            <div className="grid gap-2 mb-4">
              <h2 className="text-lg font-semibold">Addresses</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(user?.addresses && user?.addresses.length > 0) ? user?.addresses.map((address: Address, index: number) => (
                    <Card>
                    <CardContent className="p-4 grid gap-2">
                        <div className="grid gap-1">
                        <div className="font-semibold text-gray-500">Address</div>
                            <p className="text-sm">{address.address}</p>
                        </div>
                        {address.landmark && <div className="grid gap-1">
                            <div className="font-semibold text-gray-500">Landmark</div>
                            <p className="text-sm">{address.landmark}</p>
                        </div>}
                        <div className="grid grid-cols-2 gap-y-4">
                            <div>
                              <div className="font-semibold text-gray-500">City</div>
                              <p className="text-sm">{address.city}</p>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-500">State</div>
                              <p className="text-sm">{address.state}</p>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-500">Pincode</div>
                              <p className="text-sm">{address.pincode}</p>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-500">Contact Number</div>
                              <p className="text-sm">{address.contact}</p>
                            </div>
                        </div>
                    </CardContent>
                  </Card>)) : <div className="text-red-500">No addresses available</div>
                  }
                </div>
            </div>
          </div>
          <Separator />
          <div className="mt-8 gap-8">
              <Button className="mx-auto" onClick={() => router.push("/user-profile/edit")}>
                  Edit Profile
              </Button>
          </div>
        </div>
      )
}