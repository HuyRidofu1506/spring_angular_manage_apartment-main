import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { ReportService } from 'src/app/services/report.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-manage-report-add',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './manage-report-add.component.html',
  styleUrls: ['./manage-report-add.component.scss']
})
export default class RootComponent {
  data = {
    name: '',
    date: '',
    content: ''
  };

  isSubmitted = false;

  constructor(
    private reportService: ReportService,
    private router: Router
  ) {} // Inject Router

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.saveTutorial();
    }
  }

  saveTutorial(): void {
    const data = {
      name: this.data.name,
      date: this.data.date,
      content: this.data.content
    };

    this.reportService.create(data).subscribe({
      next: (res) => {
        alert('Report added successfully!');
        this.router.navigate(['/manage-report']); // Navigate to /manage-report
      },
      error: (e) => {
        alert('Failed to add report. Please try again.');
        console.error(e);
      }
    });
  }
}
