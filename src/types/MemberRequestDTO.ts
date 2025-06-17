import type { AddressRequestDTO } from "./AddressRequestDTO";

export interface MemberRequestDTO {
  name: string;
  email: string;
  address: AddressRequestDTO;
};
