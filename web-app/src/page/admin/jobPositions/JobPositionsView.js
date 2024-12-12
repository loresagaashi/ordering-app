import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { JobPositionService } from "../../../service/JobPositionService";
import { useRef } from "react";
import {
  PriceFieldTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";

const jobPositionService = new JobPositionService();

export default function JobPositionView({}) {
  const errorRef = useRef();

  const columns = [
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Salary",
      field: "salary",
      render: rowData => `${rowData.salary.toFixed(2)}$`,
      editComponent: (props) => PriceFieldTableCell(props, errorRef), 
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Job Positons"
      columns={columns}
      service={jobPositionService}
      queryKey={QueryKeys.JOBPOSITION}
      errorRef={errorRef}
      // disableDeleteAction
    />
  );
}