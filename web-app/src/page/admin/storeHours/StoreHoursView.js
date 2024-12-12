import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import TimePickers, { 
  DayOfWeekTableCell,
  SelectTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { StoreHoursService } from "../../../service/StoreHoursService";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DeliveryHoursService } from "../../../service/DeliveryHoursService";
const storeHoursService = new StoreHoursService();
const deliveryHoursService = new DeliveryHoursService();

export default function StoreHoursView({}) {

  const errorRef = useRef();
  const { data: allDeliveryHours } = useQuery(QueryKeys.DELIVERYHOURS, () =>
    deliveryHoursService.findAll(),
  );
  const columns = [
    {
      title: "Day Of Week",
      field: "dayOfWeek",
      editComponent: (props) => (
        <DayOfWeekTableCell {...props} errorRef={errorRef} />
      ),
    },

    {
      title: "Start time",
      field: "startTime",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePickers {...props} errorRef={errorRef} />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "End time",
      field: "endTime",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePickers {...props} errorRef={errorRef} />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "Delivery Hours",
      field: "deliveryHours",
      render: (rowData) =>
        `${rowData.deliveryHours?.startTime}-${rowData.deliveryHours?.endTime}`,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allDeliveryHours?.map((x) => ({
            value: x,
            label: `${x.startTime} - ${x.endTime}`,
          })) || [],
          "id"
        ),
    }
    
  ];

  return (
      <CustomMaterialTable
        title="Manage Store Hours"
        columns={columns}
        service={storeHoursService}
        queryKey={QueryKeys.STOREHOURS}
        errorRef={errorRef}
      />
  );
}