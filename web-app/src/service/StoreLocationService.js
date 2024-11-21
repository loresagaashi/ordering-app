import { BaseService } from "./BaseService";

export class StoreLocationService extends BaseService {
  constructor() {
    super("/storeLocations");
  }
}