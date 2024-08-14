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
import { Checkbox } from "../ui/checkbox";

export default function EditProfilePage() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    function convertDriveLink(url: string | undefined): string | undefined {
        if(url === undefined) return url;
        const regex = /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?(view\?(usp=sharing|usp=drive_link)|view)?$/;
        const match = url.match(regex);

        if (match && match[1]) {
            const fileId = match[1];
            return `https://drive.google.com/thumbnail?id=${fileId}`;
        }
    
        return url;
    }
    
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
            data.picture = convertDriveLink(data.picture);
            const response = await axios.post('/api/edit-profile', data);
            if(response.status === 200) {
                toast({
                    title: "Profile updated",
                    description: "Profile successfully updated!",
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
            <Card className="mt-4 rounded-sm">
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
                                            <Input placeholder="enter your name.." {...field} />
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
                                        <FormLabel>Profile Picture URL</FormLabel>
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
                                        <Card className="mt-4 rounded-sm" key={`address_edit_${index}}`}>
                                            <CardContent className="p-4 grid gap-4">
                                                <div key={`address_${index}`} className="flex flex-row w-full space-x-2">
                                                    <FormItem className="flex-1">
                                                        <div>
                                                            <FormLabel>Default</FormLabel>
                                                            <FormControl>
                                                                <div>
                                                                <Checkbox id={`default_${index}`}
                                                                    checked={address.default}
                                                                    onClick={() => {
                                                                        const newAddresses = field.value.map(
                                                                            (eachAddress: Address, addressIndex: number) => {
                                                                                if(addressIndex === index) {
                                                                                    eachAddress.default = true;
                                                                                } else {
                                                                                    eachAddress.default = false;
                                                                                }
                                                                                return eachAddress;
                                                                            });
                                                                        field.onChange(newAddresses);
                                                                    }} 
                                                                />
                                                                <label
                                                                    htmlFor={`default_${index}`}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
                                                                >
                                                                    Default
                                                                </label>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel htmlFor={`name_${index}`}>Name</FormLabel>
                                                            <FormControl>
                                                                <Input id={`name_${index}`} placeholder="enter your name" value={address.name}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].name = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel htmlFor={`contact_${index}`}>Contact</FormLabel>
                                                            <FormControl>
                                                                <Input id={`contact_${index}`} type="number" placeholder="enter your contact number" value={address.contact}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].contact = e.target.valueAsNumber;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                    onWheel={(e) => (e.target as HTMLElement).blur()}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel htmlFor={`company_${index}`}>Company</FormLabel>
                                                            <FormControl>
                                                                <Input id={`company_${index}`} placeholder="enter your company name" value={address.company}
                                                                    className="w-full"
                                                                    onChange={(e) => {
                                                                        const newAddresses = [...field.value];
                                                                        newAddresses[index].company = e.target.value;
                                                                        field.onChange(newAddresses);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>

                                                        <div>
                                                            <FormLabel htmlFor={`address_${index}`}>Address</FormLabel>
                                                            <FormControl>
                                                                <Input id={`address_${index}`} placeholder="enter your location" value={address.address}
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
                                                            <FormLabel htmlFor={`city_${index}`}>City</FormLabel>
                                                            <FormControl>
                                                                <Input id={`city_${index}`} placeholder="city" value={address.city}
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
                                                            <FormLabel htmlFor={`state_${index}`}>State</FormLabel>
                                                            <FormControl>
                                                                <Input id={`state_${index}`} placeholder="state" value={address.state}
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
                                                            <FormLabel htmlFor={`pincode_${index}`}>Pincode</FormLabel>
                                                            <FormControl>
                                                                <InputOTP id={`pincode_${index}`} maxLength={6} value={address.pincode ? address.pincode.toString(): ""} 
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
                                                            <FormLabel htmlFor={`landmark_${index}`}>Landmark</FormLabel>
                                                            <FormControl>
                                                                <Input id={`landmark_${index}`} placeholder="landmark" value={address.landmark}
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
                                    <Button type="button" onClick={() => field.onChange([...field.value, { address: "", state: "", city: "", pincode: 0, contact: undefined, landmark: "", name: "", default: false, company: "" }])}>
                                        {field.value.length > 0 ? "Add Another Address" : "Add Address"}
                                    </Button>
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