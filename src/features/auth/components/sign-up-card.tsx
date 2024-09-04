"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSignUp } from "../hooks/use-sign-up";
import { toast } from "sonner";
type Inputs = {
  name: string;
  email: string;
  password: string;
};
const CardSignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const mutation = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data) return;
    mutation.mutate(
      {
        name: data?.name,
        email: data?.email,
        password: data?.password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
          });
        },
      }
    );
  };
  return (
    <div className="bg-white w-[420px] min-h-[200px] rounded-lg p-8">
      <div className="mb-5">
        <h2 className="text-[22px] font-bold">Create an account</h2>
        <p className="text-sm text-gray-600 mt-1">
          Use your email or another service to continue
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          placeholder="Full name"
          required
          minLength={5}
          maxLength={50}
          {...register("name")}
        ></Input>
        <Input
          placeholder="Email"
          required
          type="email"
          {...register("email")}
        ></Input>
        <div className="relative">
          <Input
            placeholder="Password"
            required
            type={isPasswordVisible ? "text" : "password"}
            minLength={8}
            maxLength={20}
            {...register("password")}
          ></Input>
          {isPasswordVisible ? (
            <Eye
              className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <EyeOff
              className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setIsPasswordVisible(true)}
            />
          )}
        </div>
        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          Continue
        </Button>
      </form>
      <Separator className="my-5"></Separator>
      <div className="text-center space-y-3">
        <Button
          type="button"
          variant="outline"
          className="relative w-full"
          disabled={mutation.isPending}
          onClick={() => {
            console.log("object");
            toast.error("Not implemented yet");
          }}
        >
          <FcGoogle className="absolute left-2 top-1/2 -translate-y-1/2 size-5" />
          <span>Continue with Google</span>
        </Button>
        <Button
          variant="outline"
          className="relative w-full"
          disabled={mutation.isPending}
          onClick={() =>
            signIn("github", {
              callbackUrl: "/",
            })
          }
        >
          <FaGithub className="absolute left-2 top-1/2 -translate-y-1/2 size-5" />
          <span>Continue with Github</span>
        </Button>
        <div className="flex items-center gap-1 text-xs">
          <p className="text-xs text-muted-foreground">
            Already have an account?
          </p>
          <Link href="/sign-in" className="text-sky-700 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardSignUp;
