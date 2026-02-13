import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-blank-layout',
  imports: [RouterModule, Header,Footer],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.css',
})
export class BlankLayout {

}
