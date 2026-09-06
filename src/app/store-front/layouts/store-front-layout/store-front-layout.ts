import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from "../../components/front-navbar/front-navbar";

@Component({
  imports: [RouterOutlet, FrontNavbar],
  selector: 'app-store-front-layout',

  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout {}
