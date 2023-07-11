import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
})
export class MyMapComponent implements OnInit {
  map!: google.maps.Map;
  autocomplete!: google.maps.places.Autocomplete;
  infoWindow!: google.maps.InfoWindow;
  originMarker: google.maps.Marker = new google.maps.Marker({
    map: this.map,
    position: null,
  });
  destinationMarker: google.maps.Marker = new google.maps.Marker({
    map: this.map,
    position: null,
  });

  directions: {
    direction: google.maps.DirectionsRenderer;
    origin: string;
    destination: string;
  }[] = [];
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

    this.map.addListener('click', (event: google.maps.KmlMouseEvent) => {
      if (event.latLng) {
        this.addMarker(event.latLng);
      }
    });
    this.directions = [];

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

  addMarker(position: google.maps.LatLng): void {
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
    });
    marker.addListener('click', () => marker.setPosition(null));
    if (this.originMarker.getPosition()) {
      this.destinationMarker = marker;
    } else {
      this.originMarker = marker;
    }

    if (
      this.originMarker.getPosition() &&
      this.destinationMarker.getPosition()
    ) {
      const originPosition =
        this.originMarker.getPosition() as google.maps.LatLng;
      const destinationPosition =
        this.destinationMarker.getPosition() as google.maps.LatLng;
      this.calcAndDisplayDirection(originPosition, destinationPosition);
    }
  }

  calcAndDisplayDirection(
    originMarker: google.maps.LatLng,
    destinationMarker: google.maps.LatLng
  ): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      preserveViewport: true,
    });
    directionsRenderer.setMap(this.map);

    const routeRequest = {
      origin: originMarker,
      destination: destinationMarker,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(routeRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        this.getStreetAddress(this.originMarker)
          .then((firstStreetAddress) => {
            this.getStreetAddress(this.destinationMarker)
              .then((secondtStreetAddress) => {
                this.directions.push({
                  direction: directionsRenderer,
                  origin: firstStreetAddress.toString(),
                  destination: secondtStreetAddress.toString(),
                });
                this.map.setZoom(15);
                this.clearMarkers();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  clearMarkers(): void {
    this.originMarker.setPosition(null);
    this.destinationMarker.setPosition(null);
  }

  removeRoute(origin: string, destination: string): void {
    this.directions.forEach((direction, index) => {
      if (
        direction.origin === origin &&
        direction.destination === destination
      ) {
        direction.direction.setDirections(null);
        direction.direction.setMap(null);
        this.directions.splice(index, 1);
      }
    });
  }

  getStreetAddress(marker: google.maps.Marker): Promise<string> {
    const geocoder = new google.maps.Geocoder();
    const latLng = marker.getPosition();

    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: latLng },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            const streetAddress = results[0].formatted_address;
            resolve(streetAddress);
          } else {
            reject('Unable to retrieve street address for the marker.');
          }
        }
      );
    });
  }
}
