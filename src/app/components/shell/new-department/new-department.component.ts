import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { DepartmentModel } from "../../../models/department.model";
import { DepartmentService } from "../../../services/department.service";

@Component({
  selector: "app-new-department",
  templateUrl: "./new-department.component.html",
  styleUrls: ["./new-department.component.css"]
})
export class NewDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  submitted = false;

  constructor(
    private _location: Location,
    private _departmentService: DepartmentService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.departmentForm = this._fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      head: ["", Validators.required],
      code: ["", Validators.required]
    });
  }

  onSubmit(): void {
    this.sendCreateDepartment();
  }

  private sendCreateDepartment() {
    this.submitted = true;
    if (this.departmentForm.invalid) {
      return;
    }
    const department = <DepartmentModel>this.departmentForm.value;
    this._departmentService.postDepartment(department).subscribe();
    this.back();
  }

  back(): void {
    this._location.back();
  }
}
