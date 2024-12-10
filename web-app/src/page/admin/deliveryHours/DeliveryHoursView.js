import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import TimePickers, { 
  DayOfWeekTableCell,
} from "../../../component/TableCells";
import DateFnsUtils from "@date-io/date-fns";
import { QueryKeys } from "../../../service/QueryKeys";
import { DeliveryHoursService} from "../../../service/DeliveryHoursService";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const deliveryHoursService = new DeliveryHoursService();
export default function DeliveryHoursView({}) {
    const errorRef = useRef();
    const columns = [
        // {
        //   title: "Day Of Week",
        //   field: "dayOfWeek",
        //   editComponent: (props) => <DayOfWeekTableCell {...props} errorRef={errorRef} />,
        // },
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
    ]

    return (
      <CustomMaterialTable
        title="Manage Delivery Hours"
        columns={columns}
        service={deliveryHoursService}
        queryKey={QueryKeys.DELIVERYHOURS}
        errorRef={errorRef}
        
      />
    );
}