// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Report } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report-get',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-report-get.component.html',
  styleUrls: ['./manage-report-get.component.scss']
})

export class RootComponent implements OnInit {

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getReport(this.route.snapshot.params["id"]);
  }

  @Input() currentData: Report = {
    id: 0,
    name: '',
    date: '',
    content: '',
  };

  getReport(id: string): void {
    this.reportService.get(id)
      .subscribe({
        next: (data) => {
          this.currentData = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
