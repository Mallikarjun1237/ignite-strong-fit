import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — AK Boxing Club" },
      { name: "description", content: "Reset your AK Boxing Club account password." },
    ],
  }),
  component: ForgotPasswordPage,
});

const schema = z.object({ email: z.string().trim().email("Enter a valid email") });
type Values = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = () => {
    toast.success("If that email exists, a reset link is on its way. (demo)");
    form.reset();
  };

  return (
    <AuthShell
      title="Reset Password"
      subtitle="We'll email you a reset link"
      footer={<>Remembered it? <Link to="/login" className="font-medium text-primary hover:underline">Back to login</Link></>}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" variant="hero" size="lg" className="w-full">Send Reset Link</Button>
        </form>
      </Form>
    </AuthShell>
  );
}
