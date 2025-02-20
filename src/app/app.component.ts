import { Component } from '@angular/core';
import { AppModule } from './app.module';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { PythonService } from './python.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatListModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query: string = '';
  results: any = null;
  loading: boolean = false;

  constructor(private pythonService: PythonService) {}

  search(query: string) {
    this.pythonService.search(query).subscribe((data: any) => {
      this.results = data.results;
    });
  }
}

