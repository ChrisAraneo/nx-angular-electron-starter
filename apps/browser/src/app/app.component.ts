import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'electron-root',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'browser';
}
