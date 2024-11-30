// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Resident } from 'src/app/models/resident.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class RootComponent implements OnInit {
  constructor(
    private service: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.service.search(params)
      .subscribe({
        next: (response) => {
          this.employees = response.content;
          this.count = response.totalElements;
          console.log("data", response);
        },
        error: (e) => console.error(e)
      });
  }

  delete(id: number) {
    this.service.delete(id)
      .subscribe({
        next: (res) => {
          this.retrieveTutorials();
        },
        error: (e) => console.error(e)
      });
  }

  employees: Employee[] = [];
  name = '';

  page = 1;
  count = 0;
  pageSize = 5;

  getRequestParams(name: string, page: number, pageSize: number): any {
    let params: any = {};

      params[`name`] = name;

    if (page) {
      params[`pageNumber`] = page - 1;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveTutorials();
  }
}
