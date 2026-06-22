import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { CalendarCheck, CheckCircle2, CopyCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { trainers, memberships, fitnessLevels, genders, timeSlots } from "@/lib/data";
import { createBooking, type Booking } from "@/lib/bookings";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Class — AK Boxing Club" },
      { name: "description", content: "Reserve your boxing class or 1-on-1 session at AK Boxing Club. Choose your trainer, plan, date and time slot online." },
      { property: "og:title", content: "Book a Class — AK Boxing Club" },
      { property: "og:description", content: "Reserve your spot online — pick a trainer, date and time slot." },
    ],
  }),
  component: BookingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  age: z.coerce.number().min(8, "Must be at least 8").max(99),
  gender: z.string().min(1, "Select an option"),
  fitnessLevel: z.string().min(1, "Select your level"),
  membershipPlan: z.string().min(1, "Select a plan"),
  trainerId: z.string().min(1, "Select a trainer"),
  date: z.string().min(1, "Pick a date"),
  timeSlot: z.string().min(1, "Pick a time slot"),
});

type FormValues = z.infer<typeof schema>;

function BookingPage() {
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", phone: "", age: undefined as unknown as number,
      gender: "", fitnessLevel: "", membershipPlan: "", trainerId: "", date: "", timeSlot: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const result = createBooking(values);
    if (!result.ok) {
      form.setError("timeSlot", { message: result.reason });
      return;
    }
    setConfirmed(result.booking);
    form.reset();
  };

  if (confirmed) {
    return (
      <>
        <PageHeader eyebrow="Confirmed" title="You're Booked!" />
        <section className="section-padding">
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center glow-red"
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h2 className="mt-4 font-display text-3xl font-bold uppercase">See you in the ring</h2>
              <p className="mt-2 text-muted-foreground">A confirmation has been sent to {confirmed.email}.</p>
              <div className="mt-6 rounded-xl border border-dashed border-primary/50 bg-background p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Your Booking ID</p>
                <p className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-bold text-primary">
                  <CopyCheck className="h-5 w-5" /> {confirmed.id}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
                <Detail label="Trainer" value={trainers.find((t) => t.id === confirmed.trainerId)?.name ?? "-"} />
                <Detail label="Plan" value={confirmed.membershipPlan} />
                <Detail label="Date" value={confirmed.date} />
                <Detail label="Time" value={confirmed.timeSlot} />
              </div>
              <Button variant="hero" size="lg" className="mt-7 w-full" onClick={() => setConfirmed(null)}>
                Book another session
              </Button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Reserve" title="Book a Class" subtitle="Pick your trainer, plan and time. We'll handle the rest." />
      <section className="section-padding">
        <div className="container-x">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-border bg-card p-7 md:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Fighter" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+1 555 000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem><FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>{genders.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="fitnessLevel" render={({ field }) => (
                  <FormItem><FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>{fitnessLevels.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="membershipPlan" render={({ field }) => (
                  <FormItem><FormLabel>Membership Plan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>{memberships.map((m) => <SelectItem key={m.id} value={m.name}>{m.name} — ${m.price}/mo</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="trainerId" render={({ field }) => (
                  <FormItem><FormLabel>Preferred Trainer</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>{trainers.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" min={new Date().toISOString().split("T")[0]} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="timeSlot" render={({ field }) => (
                  <FormItem><FormLabel>Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>{timeSlots.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full">
                <CalendarCheck className="h-5 w-5" /> Confirm Booking
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
