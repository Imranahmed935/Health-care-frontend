
import PatientManagementHeader from "@/components/modules/Admin/PatientManagement/PatientManagementHeader";
import PatientTable from "@/components/modules/Admin/PatientManagement/PatientTable";
import RefreshButton from "@/components/shared/RefreshtButton";
import SearchFilter from "@/components/shared/searchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientManagement";


import { Suspense } from "react";

const AdminPatentsManagementPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
 
  const queryString = await queryStringFormatter(searchParams); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  const patientResult = await getPatients(queryString);
  const totalPages = Math.ceil(
    patientResult.meta.total / patientResult.meta.limit
  );
  return (
    <div className="space-y-6">
      <PatientManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search patients..." />
        
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>

        <PatientTable patients={patientResult.data}/>
        <TablePagination
          currentPage={patientResult.meta.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminPatentsManagementPage;