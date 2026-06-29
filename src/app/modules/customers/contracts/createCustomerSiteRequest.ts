export interface CreateCustomerSiteRequest {
  siteName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateRegion: string;
  postalCode: string;
  countryCode: string;
  timezone: string;
  accessInstructions: string;
}