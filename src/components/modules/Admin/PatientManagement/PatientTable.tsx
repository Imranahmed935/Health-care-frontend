"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IPatient } from "@/types/patient.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PatientColumns } from "./PatientColumns";
import PatientViewDialogDetail from "./PatientViewDialogDetail";
import { softDeletePatient } from "@/services/admin/patientManagement";




interface PatientTableProps {
  patients: IPatient[];
}

const PatientTable = ({ patients }: PatientTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingPatient, setDeletingPatient] = useState<IPatient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<IPatient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (patient: IPatient) => {
    setViewingPatient(patient);
  };

  const handleDelete = (patient: IPatient) => {
    setDeletingPatient(patient);
  };

  const confirmDelete = async () => {
    if (!deletingPatient) return;

    setIsDeleting(true);

    
    const result = await softDeletePatient(deletingPatient.id!);

    setIsDeleting(false);

    if (result?.success) {
      toast.success(result.message || "Patient deleted successfully");
      setDeletingPatient(null);
      handleRefresh();
    } else {
      toast.error(result?.message || "Failed to delete patient");
    }
  };

  return (
    <>
      <ManagementTable
        data={patients}
        columns={PatientColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No Patients found"
      />

      {/* View Patient Detail Dialog */}
      <PatientViewDialogDetail
        open={!!viewingPatient}
        onClose={() => setViewingPatient(null)}
        patient={viewingPatient}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPatient}
        onOpenChange={(open) => !open && setDeletingPatient(null)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        description={`Are you sure you want to delete ${deletingPatient?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PatientTable;
