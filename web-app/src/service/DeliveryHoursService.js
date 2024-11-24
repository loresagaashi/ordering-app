import { BaseService } from "./BaseService";

export class DeliveryHoursService extends BaseService {
  constructor() {
    super("/deliveryHours");
  }
}