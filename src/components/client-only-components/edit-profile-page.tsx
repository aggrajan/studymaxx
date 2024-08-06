"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Card, CardContent } from "../ui/card";
import { Address } from "@/model/Address";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { profileSchema } from "@/schemas/editProfileSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Loader2 } from "lucide-react";
import { setAuthState } from "@/lib/slices/authSlice";

export default function EditProfilePage() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            username: user?.username,
            email: user?.email,
            addresses: user?.addresses,
            picture: user?.picture
        }
    });

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/edit-profile', data);
            if(response.status === 200) {
                toast({
                    title: "Profile edited",
                    description: "Profile successfully edited int the database",
                    variant: "default"
                });

                dispatch(setAuthState({
                    _id: user?._id ? user._id : "",
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    addresses: data.addresses,
                    picture: data.picture,
                    isVerified: user?.isVerified ? user.isVerified : false,
                    isAdmin: user?.isAdmin ? user.isAdmin : false,
                    wishlist: user?.wishlist ? user.wishlist : []
                }));

                await axios.post(`/api/refresh-reviews/${user?._id}`);
                
                router.push('/user-profile');
            } else {
                toast({
                    title: "Error Occured",
                    description: "There might be some issue with the data provided",
                    variant: "destructive"
                });
                
                router.push('/user-profile');
            }
        } catch(error: any) {
            toast({
                title: "Error Occured",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
            <Card className="mt-4">
                <CardContent className="p-4 grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField 
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your name.." {...field} disabled={user?.name ? true : false} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />
                            <FormField 
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your username.." {...field} disabled={user?.username ? true : false} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />
                            <FormField 
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your email.." {...field} disabled={user?.email ? true : false} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />
                            <FormField 
                                name="picture"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Pricture URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your profile picture url.." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />
                            <FormField 
                            name="addresses"
                            control={form.control}
                            render={({ field }) => (
                                <>{
                                    field.value.map((address: Address, index: number) => (
                                        <Card className="mt-4" key={`address_edit_${index}}`}>
                                            <CardContent className="p-4 grid gap-4">
                                                <div key={`address_${index}`} className="flex flex-row w-full space-x-2">
                                                    <FormItem className="flex-1">
                                                        <div>
                                                            <FormLabel>Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="enter your location" value={address.address}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].address = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel>State</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="state" value={address.state}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].state = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel>City</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="city" value={address.city}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].city = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel>Pincode</FormLabel>
                                                            <FormControl>
                                                                <InputOTP maxLength={6} value={address.pincode ? address.pincode.toString(): ""} 
                                                                onChange={(value) => {
                                                                    const newAddresses = [...field.value];
                                                                    newAddresses[index].pincode = parseInt(value);
                                                                    field.onChange(newAddresses);
                                                                }}>
                                                                    <InputOTPGroup>
                                                                        <InputOTPSlot index={0} />
                                                                        <InputOTPSlot index={1} />
                                                                        <InputOTPSlot index={2} />
                                                                        <InputOTPSlot index={3} />
                                                                        <InputOTPSlot index={4} />
                                                                        <InputOTPSlot index={5} />
                                                                    </InputOTPGroup>
                                                                </InputOTP>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel>Landmark</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="landmark" value={address.landmark}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].landmark = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel>Contact</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="contact" type="number" value={address.contact}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].contact = e.target.valueAsNumber;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                    <img src="/minus.svg" className="w-5 h-5 cursor-pointer" onClick={(e: any) => {
                                                        const newKeywords = [...field.value];
                                                        newKeywords.splice(index, 1);
                                                        field.onChange(newKeywords);
                                                    }}></img>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    <Button type="button" onClick={() => field.onChange([...field.value, { address: "", state: "", city: "", pincode: 0, contact: undefined, landmark: "" }])}>Add Another Address</Button>
                                </>

                                
                            )}

                            
                            />
                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {
                                        isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Edit Profile')
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      );
}