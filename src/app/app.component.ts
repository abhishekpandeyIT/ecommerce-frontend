import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Shared/components/header/header.component';
import { FooterComponent } from './Shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
})
export class AppComponent {
  constructor(http: HttpClient) {
    console.log('HttpClient test:', http ? 'OK' : 'MISSING');
  }
  title = 'ecommerce-frontend';
}
