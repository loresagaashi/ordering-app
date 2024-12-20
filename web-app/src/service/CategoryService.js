import { BaseService } from "./BaseService";

export class CategoryService extends BaseService {
  constructor() {
    super("/categories");
  }
}
