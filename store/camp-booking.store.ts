import { create } from "zustand";

interface Guest {
  type: "adult" | "child" | "pet";
  count: number;
}

interface CampBooking {
  guests: Guest[];
  campUnitsBooked: number;
  amounToCharge: number;
  checkIn?: Date;
  checkOut?: Date;
}

export var useCampBookingStore = create<CampBooking>()((set) => ({
  guests: [],
  campUnitsBooked: 0,
  amounToCharge: 0,
  checkIn: undefined,
  checkOut: undefined,

  addGuest: function pushGuest(guest: Guest) {
    set((state) => ({ guests: [...state.guests, guest] }));
  },
  removeGuest: function filterGuest(type: Guest["type"]) {
    set((state) => ({
      guests: state.guests.map((g) => {
        if (g.type == type && g.count > 0) g.count - 1;
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
