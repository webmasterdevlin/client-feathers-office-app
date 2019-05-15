import { DepartmentModel } from './department.model';

export class ResponseModel {
  total: number;
  limit: number;
  skip: number;
  data: DepartmentModel[]
}
