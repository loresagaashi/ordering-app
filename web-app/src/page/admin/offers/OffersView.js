import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { MultipleCheckboxTableCell, NumberFieldTableCell, PriceFieldTableCell,  TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { OfferService } from "../../../service/OfferService";
import { ProductService } from "../../../service/ProductService";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const offerService = new OfferService();
const productService = new ProductService();
const initialStartTime = new Date(); 
const initialEndTime = new Date();
export default function OffersView({}) {
    const errorRef = useRef();
    const {data: allProducts} = useQuery(QueryKeys.PRODUCTS, () => productService.findAll());

    const columns = [
        {
          title: "Name",
          field: "name",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "Description",
          field: "description",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
            title: "Price",
            field: "price",
            render: rowData => `${rowData.price.toFixed(2)}$`,
            editComponent: (props) => PriceFieldTableCell(props, errorRef), 
          },
        {
          title: 'Start Date Time',
          field: 'startDateTime',
          initialEditValue: initialStartTime, editComponent: props => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        {...props}
                        inputVariant="outlined"
                        format="yyyy-MM-dd HH:mm" 
                        showTodayButton
                        autoOk
                        error={Boolean(props.helperText)}
                    />
                </MuiPickersUtilsProvider>
        )
        },
        {
          title: 'End Date Time',
          field: 'endDateTime',
          initialEditValue: initialEndTime,editComponent: props => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                {...props}
                inputVariant="outlined"
                format="yyyy-MM-dd HH:mm" 
                showTodayButton
                autoOk
                error={Boolean(props.helperText)}
            />
        </MuiPickersUtilsProvider>
        )
        },
        {
            title: 'Products',
            field: 'products',
            render: rowData => rowData.products?.map(x => x.name).join(", "),
            editComponent: props => MultipleCheckboxTableCell(props, allProducts, item => item.name)
        },
        {
          title: "Image Url",
          field: "imageUrl",
          editComponent: (props) => (
            <input
              type={"file"}
              onChange={(event) => props.onChange(event.target.files[0].name)}
            />
          ),
        },
        {
            title: "Bonus Points",
            field: "bonusPoints",
            editComponent: (props) => NumberFieldTableCell(props, errorRef),
          },
          {title: 'Active', type: 'boolean', field: 'disabled', initialEditValue: true}
      ];

      return (
        <CustomMaterialTable
          title="Manage Offers"
          columns={columns}
          service={offerService}
          queryKey={QueryKeys.OFFER}
          errorRef={errorRef}
        />
      );
  }