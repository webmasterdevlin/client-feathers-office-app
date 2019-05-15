import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/";
import { Location } from "@angular/common";
import { DepartmentModel } from "../../../models/department.model";
import { DepartmentService } from "../../../services/department.service";

@Component({
  selector: "app-edit-department",
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.css"]
})
export class EditDepartmentComponent implements OnInit, OnDestroy {
  department: DepartmentModel;
  sub: Subscription;
  departmentForm: FormGroup;
  _id: string;

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _fb: FormBuilder
  ) {
    this.getDepartmentFromRoute();
  }

  ngOnInit() {
    this.formBuilderInit();
  }

  getDepartmentFromRoute(): void {
    this._id = this._activatedRoute.snapshot.paramMap.get("_id");
    this.sub = this._departmentService
      .getDepartment(this._id)
      .subscribe(data => {
        this.department = data;
        console.log(JSON.stringify(this.department._id));
      });
  }

  formBuilderInit(): void {
    this.departmentForm = this._fb.group({
      _id: [this._id],
      name: ["", Validators.required],
      description: ["", Validators.required],
      head: ["", Validators.required],
      code: ["", Validators.required]
    });
  }

  onSubmit(): void {
    this.updateDepartment();
  }

  private updateDepartment() {
    const department = <DepartmentModel>this.departmentForm.value;
    this._departmentService.putDepartment(department).subscribe();
    this.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  back(): void {
    this._location.back();
  }
}
