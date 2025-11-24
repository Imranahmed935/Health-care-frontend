"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IPatient } from "@/types/patient.interface";

export const PatientColumns: Column<IPatient>[] = [
  {
    header: "patient",
    accessor: (patient) => (
      <UserInfoCell
        name={patient.name}
        email={patient.email}
        photo={patient.profilePhoto}
      />
    ),
  },
  {
    header: "address",
    accessor: (patient) => (
      <div className="flex flex-wrap gap-1">
        {patient.address ? patient.address : "N/A"}
      </div>
    ),
  },
  {
    header: "status",
    accessor: (doctor) => <StatusBadgeCell isDeleted={doctor.isDeleted} />,
  },

  {
    header: "Joined",
    accessor: (patient) => <DateCell date={patient.createdAt} />,
  },
];
