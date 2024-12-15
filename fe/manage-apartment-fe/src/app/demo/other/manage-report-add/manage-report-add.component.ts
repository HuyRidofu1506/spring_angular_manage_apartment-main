// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';


import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-report-add.component.html',
  styleUrls: ['./manage-report-add.component.scss']
})

export default class RootComponent {
  data = {
    name: '',
    date: '',
    content: '',
  };

  constructor(
    private reportService: ReportService,
  ) {}

  saveTutorial() {
    const data = {
      name: this.data.name,
      date: this.data.date,
      content: this.data.content,
    };
    
    this.reportService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.data = {
          name: '',
          date: '',
          content: '',
        }
      },
      error: (e) => console.error(e)
    });
  }
}
