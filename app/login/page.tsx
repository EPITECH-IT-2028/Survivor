"use client";

import { useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Logged successfully!" });
        setEmail("");
        setPassword("");
        login(data.token);
        router.push("/");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `${error instanceof Error ? error.message : "An unknown error has occured"}`,
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
          {message && (
            <Alert
              className={`mt-4 ${message.type === "success" ? "bg-green-100" : "bg-red-100"}`}
            >
              <AlertTitle>
                {message.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
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
