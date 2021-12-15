import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Events = [];

  constructor() {
    this.Events = [
      {
        name: 'Gratuit',
        source: "../../assets/images/glasses-alcool.jpg",
      },
      {
        name: 'Kolok',
        source: "../../assets/images/la-kolok-lyon.png",
      },
    ];
  }

}
