import { BaseService } from "./BaseService";
import { axiosInstance } from "./axiosInstance";

export class OrderDetailService extends BaseService {
  constructor() {
    super("/orderDetail");
  }
  moveToProgress(data) {
    return axiosInstance.put(`${this.requestMapping}/in-progress`, data);
  }
  moveToProcessing(data) {
    return axiosInstance.put(`${this.requestMapping}/processing`, data);
  }
  moveToDelivering(data) {
    return axiosInstance.put(`${this.requestMapping}/delivering`, data);
  }

  moveToCompleted(data) {
    return axiosInstance.put(`${this.requestMapping}/completed`, data);
  }

  findByDateBetweenAndStatusAndUser(status, user, from, to) {
    return axiosInstance.get(`${this.requestMapping}/all/${status}`, {
      params: {
        customer: user,
        from: from,
        to: to,
      },
    });
  }
}