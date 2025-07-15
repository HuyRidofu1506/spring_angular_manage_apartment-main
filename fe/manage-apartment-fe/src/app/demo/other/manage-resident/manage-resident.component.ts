// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Resident } from 'src/app/models/resident.models';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-manage-resident',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-resident.component.html',
  styleUrls: ['./manage-resident.component.scss']
})
export class ManageResidentComponent implements OnInit {
  constructor(
    private residentService: ResidentService,
    private router: Router
  ) {}

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

    this.residentService.search(params).subscribe({
      next: (response) => {
        this.residents = response.content;
        this.count = response.totalElements;
        console.log('data', response);
      },
      error: (e) => console.error(e)
    });
  }

  deleteResident(id: number) {
    const confirmed = confirm('Are you sure you want to delete this resident?'); // Show confirmation dialog
    if (confirmed) {
      this.residentService.delete(id).subscribe({
        next: (res) => {
          alert('Resident deleted successfully!'); // Success alert
          this.retrieveTutorials(); // Refresh the list
        },
        error: (e) => {
          alert('Failed to delete the resident. Please try again.'); // Error alert
          console.error(e);
        }
      });
    }
  }

  residents: Resident[] = [];
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
