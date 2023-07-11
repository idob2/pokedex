import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
})
export class MyMapComponent implements OnInit {
  map: any;
  autocomplete: any;
  workCordinations = new google.maps.LatLng(32.064578, 34.771863 );
  homeCordinations = new google.maps.LatLng(32.171712, 34.922583 );
  constructor(private router: Router){}
  ngOnInit(): void {
    this.initMap();
  }
  goBack(): void{
    this.router.navigate(["/home-page"]);
  }
  async initMap(): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    this.map = new Map(document.getElementById('map') as HTMLElement, {
      zoom: 15,
      center: this.workCordinations,
      mapId: '530f0e4e8ae594b',
    });
    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: this.workCordinations,
      title: 'Moveo Offices',
    });
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log('No location data available for the selected place');
        return;
      }

      this.map.setCenter(place.geometry.location);
      this.map.setZoom(15);

      const selectedMarker = new AdvancedMarkerElement({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
      });
    });
  }

  calculateRout(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    let routeRequest = {
      origin: this.workCordinations,
      destination: this.homeCordinations,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(routeRequest, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
}
