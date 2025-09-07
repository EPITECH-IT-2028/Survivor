"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserPassword } from "../hooks/users/updateUserPassword";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (message) {
      toast[message.type](message.title, {
        description: message.description,
      });
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await updateUserPassword(email, password);
      if (response) {
        setMessage({
          type: "success",
          title: "Password updated successfully!",
          description: "",
        });
        setEmail("");
        setPassword("");
        router.push("/login");
      } else {
        setMessage({
          type: "error",
          title: "Failed to update password",
          description: response.error || "Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        title: "An unknown error has occurred",
        description: error instanceof Error ? error.message : "",
      });
    }
  };

  return (
    <Card className="absolute top-1/2 left-1/2 w-[350px] -translate-1/2">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="loginEmail">Email</Label>
              <Input
                id="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="loginPassword">New Password</Label>
              <Input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex flex-row items-end">
          <Button type="submit">Reset</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
