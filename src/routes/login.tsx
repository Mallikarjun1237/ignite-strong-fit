import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — AK Boxing Club" },
      { name: "description", content: "Log in to your AK Boxing Club account to manage bookings, memberships and orders." },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type Values = z.infer<typeof schema>;

function LoginPage() {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  const onSubmit = () => {
    toast.success("Welcome back! (demo login — connect Lovable Cloud to enable real auth)");
    form.reset();
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Log in to manage your training"
      footer={<>New here? <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link></>}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">Forgot password?</Link>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">Log In</Button>
        </form>
      </Form>
    </AuthShell>
  );
}
