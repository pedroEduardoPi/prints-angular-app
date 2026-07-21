import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { GraphicComponent } from "./graphic/graphic.component";
import { CardComponent } from "./cards/card.component/card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, GraphicComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prints-report');
  
}
