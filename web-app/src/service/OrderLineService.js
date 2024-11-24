import { BaseService } from "./BaseService";

export class OrderLineService extends BaseService {
  constructor() {
    super("/orderLine");
  }
}