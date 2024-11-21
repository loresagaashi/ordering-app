import { BaseService } from "./BaseService";

export class StoreHoursService extends BaseService {
  constructor() {
    super("/storeHours");
  }
}