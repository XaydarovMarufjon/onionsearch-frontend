import { Component } from '@angular/core';
import { AppModule } from './app.module';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Link, PythonService } from './python.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatListModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query: string = '';
  links: Link[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private pythonService: PythonService) {}

  search() {
    if (!this.query) {
      this.error = 'Qidiruv maydoni bo‘sh bo‘lmasligi kerak!';
      return;
    }

    this.loading = true;
    this.error = '';
    this.links = [];

    this.pythonService.search(this.query).subscribe({
      next: (data) => {
        this.links = data as Link[];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Xatolik yuz berdi: ' + err.message;
        this.loading = false;
      },
    });
  }
  
}
