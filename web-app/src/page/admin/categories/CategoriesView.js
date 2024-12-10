import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { CategoryService } from "../../../service/CategoryService";
import { useRef } from "react";
import { TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";

const categoriesService = new CategoryService();

export default function CategoriesView({}) {
  const errorRef = useRef();

  const columns = [
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Categories"
      columns={columns}
      service={categoriesService}
      queryKey={QueryKeys.CATEGORIES}
      errorRef={errorRef}
      // disableDeleteAction
    />
  );
}
