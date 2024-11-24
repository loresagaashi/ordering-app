import { BaseService } from "./BaseService";

export class OfferService extends BaseService {
  constructor() {
    super("/offers");
  }
}