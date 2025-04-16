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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

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
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query: string = '';
  links: Link[] = [];
  loading: boolean = false;
  error: string = '';
  history: string[] = []; 

  constructor(private pythonService: PythonService,private http: HttpClient) { }

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
        const searchTime = new Date().toLocaleString();
        this.history.unshift(`Qidirildi: ${this.query}  |  vaqti: ${searchTime}`);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Xatolik yuz berdi: ' + err.message;
        this.loading = false;
      },
    });
  }

  downloadFile() {
    const url = `http://localhost:3000/search/download/${this.query}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = this.query; // Fayl nomi
      link.click();
    });
  }

}
