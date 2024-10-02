import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ApiRoutes from "@/api/apiRoutes";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import userData from "@/store/user";

const SignUp = () => {
  const api = new ApiRoutes(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();
  const formSchema = z
    .object({
      firstName: z.string().nonempty({
        message: "First Name is required.",
      }),
      lastName: z.string().nonempty({
        message: "Last Name is required.",
      }),
      email: z.string().email({
        message: "Invalid email address.",
      }),
      password: z
        .string()
        .min(2, { message: "Password must be at least 2 characters long." }),
      confirmPassword: z
        .string()
        .min(2, { message: "Confirm Password must match Password." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match.",
      path: ["confirmPassword"], // Specify the error path for `confirmPassword`
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.post("user", values);
      if (response.status === "success") {
        localStorage.setItem("logIn", true);
        toast.success("User created!");
       setTimeout(()=>{
        navigate("/login");
       },1000)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Bad request, please try again."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network error or server is unreachable.");
      }
      return null;
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col ">
      <Card className="w-9/12 bg-gray-400 ">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-red-500 font-bold">SignUp</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your First Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Last Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-end">
                <Button type="submit">Sign Up</Button>
              </div>
            </form>
          </Form>
          <div className="my-2">
            <Link to="/login">
              <span className="text-red-400 mx-1 ">
                Already have an account ?
              </span>
              LogIn
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignUp;
