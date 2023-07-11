import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
})
export class MyMapComponent implements OnInit {
  map: any;
  autocomplete: any;
  ngOnInit(): void {
    this.initMap();
  }

  async initMap(): Promise<void> {
    const position = { lat: 32.064578, lng: 34.771863 };

    
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    this.map = new Map(document.getElementById('map') as HTMLElement, {
      zoom: 15,
      center: position,
      mapId: 'DEMO_MAP_ID',
    });

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
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
}
