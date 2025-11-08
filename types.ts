
export interface Owner {
  fullName: string;
  idNumber: string;
  address: string;
}

export interface Gun {
  serialNumber: string;
  manufacturer: string;
  model: string;
  description: string;
  registrationDate: string;
  owner: Owner;
}
