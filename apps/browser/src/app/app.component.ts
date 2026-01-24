import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'electron-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'browser';
}
