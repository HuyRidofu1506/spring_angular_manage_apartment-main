// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Resident } from 'src/app/models/resident.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class RootComponent implements OnInit {
  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    const formattedTime = formatDate(parsedDate, 'HH:mm', 'en-US');
    const formattedDate = formatDate(parsedDate, 'dd/MM/yyyy', 'en-US');
    return `${formattedTime} ${formattedDate}`;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.service.search(params).subscribe({
      next: (response) => {
        this.employees = response.content;
        this.count = response.totalElements;
        console.log('data', response);
      },
      error: (e) => console.error(e)
    });
  }

  delete(id: number) {
    const confirmed = confirm('Are you sure you want to delete this employee?'); // Show confirmation dialog
    if (confirmed) {
      this.service.delete(id).subscribe({
        next: (res) => {
          alert('Employee deleted successfully!'); // Show success alert
          this.retrieveTutorials(); // Refresh the employee list
        },
        error: (e) => {
          alert('Failed to delete the employee. Please try again.'); // Show error alert
          console.error(e);
        }
      });
    }
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
