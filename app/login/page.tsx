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
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);
  const router = useRouter();
  const { login } = useAuth();

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", title: "Logged successfully!", description: "" });
        setEmail("");
        setPassword("");
        login(data.token);
        router.push("/");
      } else {
        setMessage({
          type: "error",
          title: "Login failed",
          description: data.error || "Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        title: "An unknown error has occured",
        description: error instanceof Error ? error.message : "",
      });
    }
  };

  return (
    <Card className="absolute top-1/2 left-1/2 w-[350px] -translate-1/2">
      <CardHeader>
        <CardTitle>Login</CardTitle>
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
              <Label htmlFor="loginPassword">Password</Label>
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
          <Button type="submit">Login</Button>
          <Button
            variant="link"
            className="mt-4"
            onClick={() => router.push("/register")}
          >
            Don&apos;t have an account? Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
