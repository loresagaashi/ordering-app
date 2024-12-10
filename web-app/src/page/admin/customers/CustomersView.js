import { CustomerService } from "../../../service/CustomerService";
import { CityService } from "../../../service/CityService";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import {
  NumberFieldTableCell,
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockIcon from '@material-ui/icons/Lock';

const customersService = new CustomerService();
const cityService = new CityService();
export default function CustomersView({}) {
  const errorRef = useRef();
  const { data: allCities } = useQuery(QueryKeys.CITY, () =>
    cityService.findAll(),
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
      title: "Email",
      field: "email",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Password",
      field: "password",
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LockIcon />
          <span style={{ marginLeft: 5 }}>••••••••</span>
        </div>
      ),
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Birth Date",
      type:"date",
      field: "birthDate",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={props.value}
            onChange={(date) => props.onChange(date)}
            format="yyyy-MM-dd"
            inputVariant="outlined"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      ),
    
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "City",
      field: "city",
      render: (rowData) => rowData.city?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCities?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
        ),
    },
    {
      title: "Bonus Points",
      field: "totalBonusPoints",
      editComponent: (props) => NumberFieldTableCell(props, errorRef),
    },
  ];

  return (
      <CustomMaterialTable
        title="Manage Customers"
        columns={columns}
        service={customersService}
        queryKey={QueryKeys.CUSTOMERS}
        errorRef={errorRef}
      />
  );
}
