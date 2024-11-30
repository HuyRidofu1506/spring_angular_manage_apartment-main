// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Report } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.scss']
})
export class RootComponent implements OnInit {
  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.reportService.search(params)
      .subscribe({
        next: (response) => {
          this.reports = response.content;
          this.count = response.totalElements;
          console.log("data", response);
        },
        error: (e) => console.error(e)
      });
  }

  delete(id: number) {
    this.reportService.delete(id)
      .subscribe({
        next: (res) => {
          this.retrieveTutorials();
        },
        error: (e) => console.error(e)
      });
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
