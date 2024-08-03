"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShopSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@uploadthing/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ShopPage = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ShopSchema>>({
    resolver: zodResolver(ShopSchema),
    defaultValues: {
      name: "",
      password: "",
      certificate: "",
      citizenshipImage: "",
      businessImage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ShopSchema>) => {
    console.log("Form data being sent:", values);
    startTransition(async () => {
      try {
        const response = await fetch("/api/shops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast({
            variant: "default",
            title: "Details submitted successfully",
            description: "Redirecting to payment page...",
          });
          router.push("/payment");
        } else {
          const error = await response.json();
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong.",
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6">Shop Registration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isPending}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                        disabled={isPending}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Image URL"
                        {...field}
                        type="text"
                        disabled={isPending}
                        className="w-full border hidden border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="citizenshipImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Image URL"
                        {...field}
                        type="text"
                        disabled={isPending}
                        className="w-full hidden border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                className="hidden"
                control={form.control}
                name="businessImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Image URL"
                        {...field}
                        type="text"
                        disabled={isPending}
                        className="w-full border hidden border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-lg font-medium text-center text-gray-700 mb-4">
              Certificate
            </p>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  const imageUrl = res[0].url;
                  form.setValue("certificate", imageUrl);
                  toast({
                    title: "Upload Completed",
                    description: "Certificate image uploaded successfully.",
                  });
                }
              }}
              onUploadError={(error: Error) => {
                toast({
                  variant: "destructive",
                  title: "Upload Error",
                  description: error.message,
                });
              }}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-lg font-medium text-center text-gray-700 mb-4">
              Citizenship Image
            </p>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  const imageUrl = res[0].url;
                  form.setValue("citizenshipImage", imageUrl);
                  toast({
                    title: "Upload Completed",
                    description: "Citizenship image uploaded successfully.",
                  });
                }
              }}
              onUploadError={(error: Error) => {
                toast({
                  variant: "destructive",
                  title: "Upload Error",
                  description: error.message,
                });
              }}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-lg font-medium text-center text-gray-700 mb-4">
              Business Image
            </p>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  const imageUrl = res[0].url;
                  form.setValue("businessImage", imageUrl);
                  toast({
                    title: "Upload Completed",
                    description: "Business image uploaded successfully.",
                  });
                }
              }}
              onUploadError={(error: Error) => {
                toast({
                  variant: "destructive",
                  title: "Upload Error",
                  description: error.message,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
