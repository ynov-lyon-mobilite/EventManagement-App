import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  // appelation de la map
  // map: google.maps.Map; 
  // @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;

  ngAfterViewInit() {
    // this.initializeMap();
  }


  // // Fonction d'initialisation de la map avec ca longitude / latitude et le zoom
  // initializeMap() {
  //   const lngLat = new google.maps.LatLng(6.5874964, 3.9886097);
  //   const mapOptions: google.maps.MapOptions = {
  //     center: lngLat,
  //     zoom: 16,
  //     fullscreenControl: false,
  //     mapTypeControl: false,
  //     streetViewControl: false
  //   };
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // }
}

