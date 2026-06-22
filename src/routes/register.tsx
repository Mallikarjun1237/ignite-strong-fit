import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — AK Boxing Club" },
      { name: "description", content: "Create your AK Boxing Club account to book classes, manage your membership and shop supplements." },
    ],
  }),
  component: RegisterPage,
});

const roles = ["User", "Trainer", "Admin"] as const;

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(80),
    email: z.string().trim().email("Enter a valid email"),
    role: z.enum(roles),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });
type Values = z.infer<typeof schema>;

function RegisterPage() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", role: "User", password: "", confirm: "" },
  });

  const onSubmit = (v: Values) => {
    toast.success(`Account created as ${v.role}! (demo — connect Lovable Cloud for real auth & roles)`);
    form.reset();
  };

  return (
    <AuthShell
      title="Join The Club"
      subtitle="Create your account in seconds"
      footer={<>Already a member? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link></>}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Fighter" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="role" render={({ field }) => (
            <FormItem><FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="confirm" render={({ field }) => (
            <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" variant="hero" size="lg" className="w-full">Create Account</Button>
        </form>
      </Form>
    </AuthShell>
  );
}
