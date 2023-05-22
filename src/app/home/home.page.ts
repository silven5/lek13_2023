import { Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [
    Geolocation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  // Фотографія
  myImage: string | undefined = "";
  // Геолокація
  latitude: number = 0;
  longitude: number = 0;
  position = false;
  constructor() { }
 
  // Отримуємо зображення з камери
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
    console.log(this.myImage);
  }
  // Отримуємо геолокацію
  getCurrentPosition() {
    const coordinates = navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.position = true;
    }, error => {
      console.log('error', error);
    });
  }
  // Виводимо на мапі
  apiKey = 'AIzaSyDswK4861wpKeibVuEsIVJvTLSsXmQeYWQ';
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: this.apiKey,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 16,
      },
    });
    this.newMap.addMarker(
      {
        coordinate: {
          lat: this.latitude,
          lng: this.longitude,
        }
      }
    )
  }
}

