import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { EmployeeService } from "../../../service/EmployeeService";
import { StoreLocationService } from "../../../service/StoreLocationService";
import { JobPositionService } from "../../../service/JobPositionService";

const employeeService = new EmployeeService();
const storeLocationService = new StoreLocationService();
const jobPositionService = new JobPositionService();

export default function EmployeeView({}) {
  const errorRef = useRef();
  const { data: allStoreLocations } = useQuery(QueryKeys.STORELOCATION, () =>
    storeLocationService.findAll(),
  );
  const { data: allJobPositions } = useQuery(QueryKeys.JOBPOSITION, () =>
    jobPositionService.findAll(),
  );
  const columns = [
    {
      title: "First Name",
      field: "firstName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Last Name",
      field: "lastName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Job Position",
      field: "jobPosition",
      render: (rowData) => rowData.jobPosition?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allJobPositions?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
        ),
    },
    {
      title: "Store Location",
      field: "storeLocation",
      render: (rowData) => rowData.storeLocation?.nameOfLocation,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allStoreLocations?.map((x) => ({ value: x, label: x.nameOfLocation })) || [],
          "id",
        ),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Employees"
      columns={columns}
      service={employeeService}
      queryKey={QueryKeys.EMPLOYEE}
      errorRef={errorRef}
    />
  );
}