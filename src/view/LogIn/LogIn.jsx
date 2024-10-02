import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
const LogIn = () => {
  const {setUserData} = userData()
  const api = new ApiRoutes(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();
  // Example usage to login
  async function loginUser(payload) {
    try {
      const response = await api.login(payload);
      return response;
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response?.data?.message}`);
      }
      return null;
    }
  }

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const res = await loginUser(values);
    if (res.status === "success") {
      localStorage.setItem("logIn", true);
      const data = {
        firstName:res.firstName,
        lastName:res.lastName,
        id:res.id
      };
      localStorage.setItem("userData",JSON.stringify(data))
      setUserData(data)
      toast.success("Login successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col ">
      <Card className="w-9/12 bg-gray-400 ">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-red-500 font-bold">ToDo</span> App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              <div className="text-end">
                <Button type="submit">Log In</Button>
              </div>
            </form>
          </Form>
          <div className="my-2">
             <Link to="/sign-up"><span className="text-red-400 mx-1 ">Don't have an account ?</span>SignUp</Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default LogIn;
