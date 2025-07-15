// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Report } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.scss']
})
export class RootComponent implements OnInit {
  constructor(private reportService: ReportService) {}

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

    this.reportService.search(params).subscribe({
      next: (response) => {
        this.reports = response.content;
        this.count = response.totalElements;
        console.log('data', response);
      },
      error: (e) => console.error(e)
    });
  }

  delete(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this report?'); // Show confirmation dialog
    if (confirmed) {
      this.reportService.delete(id).subscribe({
        next: (res) => {
          alert('Report deleted successfully!'); // Show success alert
          this.retrieveTutorials(); // Refresh the list of reports
        },
        error: (e) => {
          alert('Failed to delete the report. Please try again.'); // Show error alert
          console.error(e);
        }
      });
    }
  }

  reports: Report[] = [];
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
