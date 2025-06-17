import type { AddressRequestDTO } from "./AddressRequestDTO";

export interface MemberResponseDTO {
  memberId: number;
  name: string;
  email: string;
  address: AddressRequestDTO;
};
