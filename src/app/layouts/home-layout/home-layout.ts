import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';



@Component({
  selector: 'app-home-layout',
  imports: [RouterModule,Header,Footer],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {

}
