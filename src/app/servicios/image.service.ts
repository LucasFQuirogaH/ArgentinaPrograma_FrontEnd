import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL, deleteObject, } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  urlTwo: string = "";
  urlThree: string = "";
  urlEnEdicion: string;
  // urlABorrar: string;
  nombreRecuperado: string;

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `perfiles/` + name);

    uploadBytes(imgRef, file)
      .then(response => { this.getImages() })
      .catch(error => console.log(error)
      )
  }

  public uploadImageTwo($event: any, name: string) {
    const fileTwo = $event.target.files[0];
    const imgRefTwo = ref(this.storage, `portadas/` + name);

    uploadBytes(imgRefTwo, fileTwo)
      .then(response => { this.getImagesTwo() })
      .catch(error => console.log(error)
      )
  }

  public uploadImageThree($event: any, name: string) {
    const fileThree = $event.target.files[0];
    const imgRefThree = ref(this.storage, `proyectos/${name}`);

    uploadBytes(imgRefThree, fileThree) // Aqui lo subio //
      .then(response => { this.getImagesThree(name) })
      .catch(error => console.log(error)
      )
  }
  public uploadImageThreeEdit($event: any, name: string) {
    const fileThree = $event.target.files[0];
    const imgRefThree = ref(this.storage, `proyectos/${name}`);

    uploadBytes(imgRefThree, fileThree) // Aqui lo subio //
      .then(response => { this.getImagesThreeEdit(name) })
      .catch(error => console.log(error)
      )
  }

  getImages() {
    const imagesRef = ref(this.storage, 'perfiles');
    list(imagesRef)
      .then(async response => {
        for (let item of response.items) {
          this.url = await getDownloadURL(item);
          console.log("La URL es: " + this.url);
        }
      })
      .catch(error => console.log(error))
  }

  getImagesTwo() {
    const imagesRefTwo = ref(this.storage, 'portadas');
    list(imagesRefTwo)
      .then(async response => {
        for (let item of response.items) {
          this.urlTwo = await getDownloadURL(item);
          console.log("La URL es: " + this.urlTwo);
        }
      })
      .catch(error => console.log(error))
  }
  getImagesThree(name: string) {
    const imagesRefThree = ref(this.storage, 'proyectos');
    list(imagesRefThree)
      .then(async response => {
        // Aqui tengo que armar un codigo para recuperar el URL exacto de la posicion //
        // Aqui tengo que armar un codigo para recuperar el URL exacto de la posicion //
        for (let item of response.items) {
          let urlEnEdicion = await getDownloadURL(item);
          this.nombreRecuperado = "";
          let i = 0;
          while (urlEnEdicion[i] != "_") {
            i++;
          }
          i++;
          while (urlEnEdicion[i] != "?") {
            this.nombreRecuperado = this.nombreRecuperado + urlEnEdicion[i];
            i++;
          }
          if (name == "proyecto_" + this.nombreRecuperado) {
            this.urlThree = urlEnEdicion;
            break;
          }
        }
      })
      // Aqui tengo que armar un codigo para recuperar el URL exacto de la posicion //
      // Aqui tengo que armar un codigo para recuperar el URL exacto de la posicion //
      .catch(error => console.log(error))
  }

  getImagesThreeEdit(name: string) {
    const imagesRefThree = ref(this.storage, 'proyectos');
    list(imagesRefThree)
      .then(async response => {

        for (let item of response.items) {
          let urlEnEdicion = await getDownloadURL(item);
          let i = 0;
          while (urlEnEdicion[i] != "_") {
            i++;
          }
          i++;
          while (urlEnEdicion[i] != "?") {
            this.nombreRecuperado = this.nombreRecuperado + urlEnEdicion[i];
            i++;
          }
          if (name == this.nombreRecuperado) {
            this.urlThree = urlEnEdicion;
            break;
          }
        }
      })
      .catch(error => console.log(error))
  }


  async tambienBorraFotoDeFirebase(urlABorrar: string) {

    this.nombreRecuperado = "";
    let urlEnEdicion = urlABorrar;
    let i = 0;
    while (urlEnEdicion[i] != "_") {
      i++;
    }
    i++;
    while (urlEnEdicion[i] != "?") {
      this.nombreRecuperado = this.nombreRecuperado + urlEnEdicion[i];
      i++;
    }

    //---------------------------------------------------------------------//
    //---------------- Con estos codigos procede a borrar -----------------//
    //---------------------------------------------------------------------//
    alert('id recuperado a borrar: ' + this.nombreRecuperado);
    //---------------------------------------------------------------------//
    //---------------- Con estos codigos procede a borrar -----------------//
    //---------------------------------------------------------------------//


    
    //---------------------------------------------------------------------------------//
    // -----  Aqui llegue con la borrada, ahora hay que hacer andar este codigo  ------//
    //---------------------------------------------------------------------------------//

    const imgRefThreeForDelete = ref(this.storage, "/proyectos/proyecto_" + this.nombreRecuperado);

    deleteObject(imgRefThreeForDelete).then(() => {
      console.log("la imagen se elimino");
    }).catch((error) => {
      console.log("ocurrio un error: ", error);
    });

    //---------------------------------------------------------------------------------//
    // -----  Aqui llegue con la borrada, ahora hay que hacer andar este codigo  ------//
    //---------------------------------------------------------------------------------//


  }
}
