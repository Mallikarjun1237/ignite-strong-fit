import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Users, Dumbbell, CreditCard, Package, CalendarCheck, Star, TrendingUp, DollarSign,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem, Counter } from "@/components/motion/Reveal";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { trainers, memberships, products, testimonials } from "@/lib/data";
import { getBookings } from "@/lib/bookings";
import { priceAfterDiscount } from "@/lib/cart";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — AK Boxing Club" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const members = [
  { id: "u1", name: "Jasmine Taylor", plan: "Silver", joined: "2024-02-11", status: "Active" },
  { id: "u2", name: "Marcus Webb", plan: "Gold", joined: "2024-05-03", status: "Active" },
  { id: "u3", name: "Priya Khan", plan: "Bronze", joined: "2024-08-19", status: "Active" },
  { id: "u4", name: "Daniel Ruiz", plan: "Gold", joined: "2023-11-27", status: "Active" },
  { id: "u5", name: "Aisha Bello", plan: "Silver", joined: "2025-01-14", status: "Frozen" },
];

const revenueData = [
  { month: "Jan", revenue: 18200 }, { month: "Feb", revenue: 21400 }, { month: "Mar", revenue: 24800 },
  { month: "Apr", revenue: 23100 }, { month: "May", revenue: 28600 }, { month: "Jun", revenue: 31200 },
];
const signupData = [
  { month: "Jan", members: 22 }, { month: "Feb", members: 31 }, { month: "Mar", members: 28 },
  { month: "Apr", members: 35 }, { month: "May", members: 42 }, { month: "Jun", members: 51 },
];
const planSplit = [
  { name: "Bronze", value: 38 }, { name: "Silver", value: 47 }, { name: "Gold", value: 29 },
];
const PIE_COLORS = ["oklch(0.6 0.05 60)", "oklch(0.75 0.02 240)", "var(--gold)"];

function StatCard({ icon: Icon, label, value, prefix = "", suffix = "", decimals = 0 }: {
  icon: typeof Users; label: string; value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  return (
    <StaggerItem>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></span>
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="mt-4 font-display text-3xl font-bold">
          {prefix}<Counter to={value} decimals={decimals} />{suffix}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </StaggerItem>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${active ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
      {status}
    </span>
  );
}

function AdminPage() {
  const bookings = useMemo(() => (typeof window !== "undefined" ? getBookings() : []), []);
  const inventoryValue = products.reduce((s, p) => s + priceAfterDiscount(p), 0);

  return (
    <>
      <PageHeader eyebrow="Control Room" title="Admin Dashboard" subtitle="Manage members, trainers, plans, products, bookings and reviews — all in one place." />

      <section className="section-padding pt-12">
        <div className="container-x">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Users} label="Active Members" value={members.length + 142} />
            <StatCard icon={CalendarCheck} label="Total Bookings" value={bookings.length + 318} />
            <StatCard icon={DollarSign} label="Monthly Revenue" value={31200} prefix="$" />
            <StatCard icon={Star} label="Avg. Rating" value={4.9} decimals={1} />
          </Stagger>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
              <h3 className="font-display text-lg font-bold uppercase">Revenue</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold uppercase">Plan Split</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={planSplit} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                      {planSplit.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Legend />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold uppercase">New Members</h3>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} cursor={{ fill: "var(--secondary)" }} />
                  <Bar dataKey="members" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="members">
              <TabsList className="flex h-auto flex-wrap justify-start gap-1">
                <TabsTrigger value="members"><Users className="mr-1.5 h-4 w-4" />Members</TabsTrigger>
                <TabsTrigger value="trainers"><Dumbbell className="mr-1.5 h-4 w-4" />Trainers</TabsTrigger>
                <TabsTrigger value="plans"><CreditCard className="mr-1.5 h-4 w-4" />Plans</TabsTrigger>
                <TabsTrigger value="products"><Package className="mr-1.5 h-4 w-4" />Products</TabsTrigger>
                <TabsTrigger value="bookings"><CalendarCheck className="mr-1.5 h-4 w-4" />Bookings</TabsTrigger>
                <TabsTrigger value="reviews"><Star className="mr-1.5 h-4 w-4" />Testimonials</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="mt-4">
                <DataTable
                  head={["Name", "Plan", "Joined", "Status"]}
                  rows={members.map((m) => [m.name, m.plan, m.joined, <StatusBadge key={m.id} status={m.status} />])}
                />
              </TabsContent>
              <TabsContent value="trainers" className="mt-4">
                <DataTable
                  head={["Name", "Experience", "Specialization", "Certifications"]}
                  rows={trainers.map((t) => [t.name, t.experience, t.specialization, t.certifications.join(", ")])}
                />
              </TabsContent>
              <TabsContent value="plans" className="mt-4">
                <DataTable
                  head={["Plan", "Price", "Tagline", "Features"]}
                  rows={memberships.map((m) => [m.name, `$${m.price}/mo`, m.tagline, `${m.features.length} included`])}
                />
              </TabsContent>
              <TabsContent value="products" className="mt-4">
                <DataTable
                  head={["Product", "Category", "Price", "Discount", "Rating"]}
                  rows={products.map((p) => [p.name, p.category, `$${p.price.toFixed(2)}`, `${p.discount}%`, `${p.rating} ★`])}
                />
              </TabsContent>
              <TabsContent value="bookings" className="mt-4">
                {bookings.length === 0 ? (
                  <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                    No bookings yet. New bookings made on the Booking page will appear here.
                  </p>
                ) : (
                  <DataTable
                    head={["Booking ID", "Name", "Date", "Time", "Trainer"]}
                    rows={bookings.map((b) => [b.id, b.name, b.date, b.timeSlot, trainers.find((t) => t.id === b.trainerId)?.name ?? "-"])}
                  />
                )}
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <DataTable
                  head={["Member", "Role", "Rating", "Quote"]}
                  rows={testimonials.map((t) => [t.name, t.role, `${t.rating} ★`, t.quote])}
                />
              </TabsContent>
            </Tabs>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Inventory value: ${inventoryValue.toFixed(2)} · Demo dashboard — connect Lovable Cloud for live data, roles and persistence.
          </p>
        </div>
      </section>
    </>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>{head.map((h) => <TableHead key={h}>{h}</TableHead>)}</TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} className={j === 0 ? "font-medium" : "text-muted-foreground"}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
