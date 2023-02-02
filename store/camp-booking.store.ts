import { create } from "zustand";

export interface Guest {
  type: "adult" | "child" | "pet";
  count: number;
}

interface CampBooking {
  guests: Guest[];
  campUnitsBooked: number;
  amounToCharge: number;
  checkIn?: Date;
  checkOut?: Date;

  incrementGuest: (type: Guest["type"], count: number) => void;
  incrementCampUnit: (count: number) => void;
  setAmount: (amount: number) => void;
  reset: () => void;
}

export var useCampBookingStore = create<CampBooking>()((set, get) => ({
  guests: [
    { type: "adult", count: 1 },
    { type: "child", count: 0 },
    { type: "pet", count: 0 },
  ],
  campUnitsBooked: 1,
  amounToCharge: 0,
  checkIn: undefined,
  checkOut: undefined,
  reset() {
    set({
      guests: [
        { type: "adult", count: 1 },
        { type: "child", count: 0 },
        { type: "pet", count: 0 },
      ],
      campUnitsBooked: 1,
      amounToCharge: 0,
      checkIn: undefined,
      checkOut: undefined,
    });
  },
  incrementGuest: function increment(type: Guest["type"], count: number) {
    set((state) => ({
      guests: state.guests.map((g) => {
        if (g.type == type) g.count += count;
        return g;
      }),
    }));
  },
  incrementCampUnit: function increment(count: number) {
    set((state) => ({ campUnitsBooked: state.campUnitsBooked + count }));
  },
  setAmount: function updateAmount(amount: number) {
    if (amount >= 0) set({ amounToCharge: amount });
  },
  setCheckIn: function updateCheckIn(date: Date) {
    if (datetimeShouldBeInFuture(date)) set({ checkIn: date });
  },
  setCheckOut: function updateCheckOut(date: Date) {
    if (datetimeShouldBeInFuture(date)) set({ checkOut: date });
  },
}));

function datetimeShouldBeInFuture(date: Date) {
  return date > new Date(Date.now());
}
