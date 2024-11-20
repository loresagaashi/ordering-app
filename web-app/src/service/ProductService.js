import { BaseService } from "./BaseService";

export class ProductService extends BaseService {
  constructor() {
    super("/products");
  }
}
