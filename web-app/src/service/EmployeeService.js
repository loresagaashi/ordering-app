import { BaseService } from "./BaseService";

export class EmployeeService extends BaseService {
  constructor() {
    super("/employees");
  }
}