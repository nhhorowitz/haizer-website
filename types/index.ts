export type ListingType =
  | 'for_sale'
  | 'for_rent'
  | 'flip'
  | 'commercial_sale'
  | 'commercial_rent'
  | 'development';

export type ListingStatus = 'pending_review' | 'active' | 'pending' | 'expired' | 'rejected';

export type UserRole = 'buyer' | 'seller' | 'agent' | 'investor' | 'service_provider' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  tags: string[];
  email_verified: boolean;
  is_trusted_agent: boolean;
  created_at: string;
}

export interface Listing {
  id: string;
  owner_id: string;
  type: ListingType;
  status: ListingStatus;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  description: string;
  photos: string[];
  // Heimishe features
  eruv_access: boolean;
  walk_to_shul: boolean;
  yeshiva_nearby: boolean;
  bais_yaakov_nearby: boolean;
  mikvah_nearby: boolean;
  // Counters
  save_count: number;
  view_count: number;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  listing_id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
}

export type SubscriptionTier =
  | 'free'
  | 'store_pro'
  | 'brokerage'
  | 'featured_agent'
  | 'pro_agent';
