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
  infoWindow: any;
  markers: any[] = [];

  workLatLng = new google.maps.LatLng(32.064578, 34.771863);
  homeLatLng = new google.maps.LatLng(32.171712, 34.922583);


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initMap();
  }
  goBack(): void {
    this.router.navigate(['/home-page']);
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
      center: this.workLatLng,
      mapId: '530f0e4e8ae594b',
    });

    this.map.addListener('click', (event: any) => {
      this.addMarker(event.latLng);
    });

    this.markers = [];

    this.infoWindow = new google.maps.InfoWindow();

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: this.workLatLng,
      title: 'Moveo Offices',
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(marker.title);
      this.infoWindow.open(this.map, marker);
    });

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement
    );
    //listener for selecting place from the search bar
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

      google.maps.event.addListener(selectedMarker, 'click', () => {
        this.infoWindow.setContent(selectedMarker.title);
        this.infoWindow.open(this.map, selectedMarker);
      });
    });
  }
  addMarker(position: any): void {
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
    });
    marker.addListener('click', () => {
      marker.setPosition(null);
    });
    this.markers.push(marker);

    if(this.markers.length === 2){
        this.calcAndDisplayDirection();
    }
  }

  calcAndDisplayDirection(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    
    const routeRequest = {
      origin: this.markers[0].position,
      destination: this.markers[1].position,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    
    directionsService.route(routeRequest, (result: any, status: any) => {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  
    this.clearMarkers();
  }

  showDirections(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    const routeRequest = {
      origin: this.workLatLng,
      destination: this.homeLatLng,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(routeRequest, function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
  clearMarkers(): void {
    this.markers[0].setPosition(null);
    this.markers[1].setPosition(null);
    this.markers.splice(0,2);
  }
}
