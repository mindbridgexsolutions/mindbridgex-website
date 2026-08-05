import API from "./api";

export interface BookingPayload {
  serviceId: string;
  panditId?: string;
  devoteeName: string;
  devoteePhone: string;
  address: string;
  scheduledDate: string;
  muhuratTime: string;
  includeSamagri: boolean;
}

export const bookingService = {
  // Fetch all bookings for a devotee
  getBookingsByDevotee: async (devoteeId: string) => {
    const response = await API.get(`/bookings/devotee/${devoteeId}`);
    return response.data;
  },

  // Create a new puja booking
  createBooking: async (payload: BookingPayload) => {
    const response = await API.post("/bookings", payload);
    return response.data;
  },

  // Fetch available services catalog from Spring Boot
  getServicesCatalog: async () => {
    const response = await API.get("/services");
    return response.data;
  },

  // Fetch verified pandits directory
  getPanditsDirectory: async () => {
    const response = await API.get("/pandits");
    return response.data;
  },
};