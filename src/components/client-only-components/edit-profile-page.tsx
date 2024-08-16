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
import { useForm, useFieldArray } from "react-hook-form";
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
    
    const { register, handleSubmit, formState, control, trigger, setValue } = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            username: user?.username,
            email: user?.email,
            addresses: user?.addresses,
            picture: user?.picture
        },
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "addresses"
    });

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        setIsSubmitting(true);
        const isValid = await trigger();
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }
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

    const handleAppendAddress = async () => {
        append({ address: "", state: "", city: "", pincode: 0, contact: NaN, landmark: "", name: "", default: false, company: "" });
        await trigger();
    };

    const errorMessageCss = "text-xs text-red-600 font-normal mt-1"

    return (
        <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
            <Card className="mt-4 rounded-sm">
                <CardContent className="w-full p-4">
                    
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        
                                            <Input placeholder="enter your name.." id="name" {...register("name")} onChange={async (e) => {
                                                setValue("name", e.target.value);
                                                await trigger();
                                            }} />
                                        
                                        <div className={errorMessageCss}>{formState.errors.name?.message}</div>
                                    </div>
                                  
                            
                            
                                    <div>
                                        <Label htmlFor="username">Username</Label>
                                        
                                            <Input placeholder="enter your username.." id="username" {...register(`username` as const)} onChange={async (e) => {
                                                setValue("username", e.target.value);
                                                await trigger();
                                            }} disabled={user?.username ? true : false} />
                                        
                                        <div className={errorMessageCss}>{formState.errors.username?.message}</div>
                                    </div>
                                
                            
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                       
                                            <Input placeholder="enter your email.." id="email" {...register(`email` as const)} onChange={async (e) => {
                                                setValue("email", e.target.value);
                                                await trigger();
                                            }} disabled={user?.email ? true : false} />
                                        
                                        <div className={errorMessageCss}>{formState.errors.email?.message}</div>
                                    </div>
                                
                            
                                    <div>
                                        <Label htmlFor="picture">Profile Picture URL</Label>
                                        
                                            <Input placeholder="enter your profile picture url.." id="picture" {...register(`picture` as const)} onChange={async (e) => {
                                                setValue("picture", e.target.value);
                                                await trigger();
                                            }} />
                                        
                                        <div className={errorMessageCss}>{formState.errors.picture?.message}</div>
                                    </div>
                               
                            
                                <>{
                                    fields.map((field, index) => (
                                        <Card className="mt-4 rounded-sm" key={`address_edit_${index}}`}>
                                            <CardContent className="relative w-full p-4">
                                                <div key={`address_${index}`} className="grid grid-cols-1 gap-y-2 w-full">    
                                                    <div>
                                                        <Checkbox id={`default_${index}`}

                                                            checked={field.default}
                                                            onClick={async () => {
                                                                if(!field.default) {
                                                                    const newAddresses = fields.map(
                                                                        (eachAddress: Address, addressIndex: number) => {
                                                                            if(addressIndex === index) {
                                                                                eachAddress.default = true;
                                                                            } else {
                                                                                eachAddress.default = false;
                                                                            }
                                                                            return eachAddress;
                                                                        });
                                                                    setValue("addresses", newAddresses);
                                                                } else {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].default = false;
                                                                    setValue("addresses", newAddresses);
                                                                }
                                                                await trigger(`addresses.${index}.default`);
                                                            }} 
                                                        />
                                                        <label
                                                            htmlFor={`default_${index}`}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
                                                        >
                                                            Set Default
                                                        </label>
                                                        </div>
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.default?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`name_${index}`}>Name</Label>
                                                        
                                                            <Input id={`name_${index}`} placeholder="enter your name" 
                                                                className="w-full"
                                                                value={field.name}
                                                                onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].name = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                                
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.name?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`contact_${index}`}>Contact</Label>
                                                        
                                                            <Input id={`contact_${index}`} type="number" placeholder="enter your contact number" 
                                                                className="w-full"
                                                                value={field.contact}
                                                                onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].contact = e.target.valueAsNumber;
                                                                    setValue("addresses", newAddresses);
                                                                    await trigger(`addresses.${index}.contact`);
                                                                }}
                                                                onWheel={(e) => (e.target as HTMLElement).blur()}
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.contact?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`company_${index}`}>Company</Label>
                                                        
                                                            <Input id={`company_${index}`} placeholder="enter your company name" 
                                                                className="w-full"
                                                                value={field.company} onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].company = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.company?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`address_${index}`}>Address</Label>
                                                        
                                                            <Input id={`address_${index}`} placeholder="enter your location"
                                                                className="w-full"
                                                                value={field.address} onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].address = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.address?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`city_${index}`}>City</Label>
                                                        
                                                            <Input id={`city_${index}`} placeholder="city"
                                                                className="w-full"
                                                                value={field.city} onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].city = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.city?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`state_${index}`}>State</Label>
                                                        
                                                            <Input id={`state_${index}`} placeholder="state"
                                                                className="w-full"
                                                                value={field.state} onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].state = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                            />
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.state?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`pincode_${index}`}>Pincode</Label>
                                                        
                                                            <InputOTP id={`pincode_${index}`} maxLength={6} value={field.pincode ? field.pincode.toString(): ""} 
                                                            onChange={async (value) => {
                                                                const newAddresses = [...fields];
                                                                newAddresses[index].pincode = parseInt(value);
                                                                setValue("addresses", newAddresses);
                                                                await trigger(`addresses.${index}.pincode`);
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
                                                        
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.pincode?.message}</div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor={`landmark_${index}`}>Landmark</Label>
                                                            <Input id={`landmark_${index}`} placeholder="landmark" 
                                                                className="w-full"
                                                                value={field.landmark} onChange={async (e) => {
                                                                    const newAddresses = [...fields];
                                                                    newAddresses[index].landmark = e.target.value;
                                                                    setValue(`addresses`, newAddresses);
                                                                    await trigger();
                                                                }}
                                                            />
                                                        <div className={errorMessageCss}>{formState.errors.addresses?.[index]?.landmark?.message}</div>
                                                    </div>
                                                    
                                                    <img src="/minus.svg" className="absolute top-3 right-3 z-100 w-5 h-5 cursor-pointer" onClick={() => remove(index)}></img>
                                                
                                            </CardContent>
                                        </Card>
                                    
                                    ))}
                                    <Button type="button" onClick={handleAppendAddress}>
                                        {fields.length > 0 ? "Add Another Address" : "Add Address"}
                                    </Button>
                                </>
                                
                            
                            

                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {
                                        isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Edit Profile')
                                    }
                                </Button>
                            </div>
                        </form>
                
                </CardContent>
            </Card>
        </div>
      );
}