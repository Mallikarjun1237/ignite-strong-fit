// Simple in-memory + localStorage booking store.
// Swap these functions for real API/DB calls later.
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  fitnessLevel: string;
  membershipPlan: string;
  trainerId: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

const KEY = "ak_bookings";

function read(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(list: Booking[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function getBookings(): Booking[] {
  return read();
}

export function generateBookingId(): string {
  return "AK-" + Math.random().toString(36).slice(2, 7).toUpperCase() + "-" + Date.now().toString().slice(-4);
}

export function isSlotTaken(trainerId: string, date: string, timeSlot: string): boolean {
  return read().some((b) => b.trainerId === trainerId && b.date === date && b.timeSlot === timeSlot);
}

export function createBooking(data: Omit<Booking, "id" | "createdAt">):
  | { ok: true; booking: Booking }
  | { ok: false; reason: string } {
  if (isSlotTaken(data.trainerId, data.date, data.timeSlot)) {
    return { ok: false, reason: "That trainer is already booked for this date and time slot. Please choose another." };
  }
  const booking: Booking = { ...data, id: generateBookingId(), createdAt: new Date().toISOString() };
  write([...read(), booking]);
  return { ok: true, booking };
}
