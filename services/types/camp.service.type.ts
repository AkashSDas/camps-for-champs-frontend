import { Accessibility, Amenity, CampStatus, PolicyType } from "../../lib/camp";

export interface Camp {
  _id: string;
  name?: string;
  about?: string;
  accessibilities: Accessibility[];
  amenities: Amenity[];
  price?: number;
  campLimit?: number;
  createdAt: string;
  updatedAt: string;
  campId: string;
  cancellationPolicy?: {
    type: PolicyType;
    description: string;
  };
  googleMapURL?: string;
  address?: string;
  location?: {
    type: "Point";
    coordinates: number[];
  };
  startDate?: string;
  endDate?: string;
  images: { id?: string; URL: string; type: string; description?: string }[];
  status: CampStatus;
}

export interface GetCampResponse {
  success: boolean;
  message?: string;
  camp?: Camp;
}

export interface UpdateCampSettingsResponse {
  success: boolean;
  message?: string;
  camp?: Camp;
}
