

export interface IPatient {
  id?: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  address?: string | null;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

