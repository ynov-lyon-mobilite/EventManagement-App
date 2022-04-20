import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {
  connexion;
  deconnexion;
  

  constructor() { }

  ngOnInit() {
      this.connexion = document.getElementById("connecter");
      this.deconnexion = document.getElementById("deconnecter");

      if (localStorage.getItem('token') != undefined) {
        this.connexion.style.display = "block";
        this.deconnexion.style.display = "none";
      } else {
        this.connexion.style.display = "none";
        this.deconnexion.style.display = "block";
      }
  }

}
