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
        location: '30 Av. Berthelot, 69007 Lyon',
        date: '17 janvier 2022',
        time: '18h',
        source: "../../assets/images/glasses-alcool.jpg",
      },
      {
        name: 'Kolok',
        location: '30 Av. Berthelot, 69007 Lyon',
        date: '20 février 2022',
        time: '18h',
        source: "../../assets/images/la-kolok-lyon.png",
      },
    ];
  }

}
