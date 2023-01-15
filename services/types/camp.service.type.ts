import { Accessibility, Amenity, PolicyType } from "../../lib/camp";

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
