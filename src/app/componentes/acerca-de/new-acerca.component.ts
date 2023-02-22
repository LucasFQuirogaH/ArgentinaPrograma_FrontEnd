import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acerca } from 'src/app/model/acerca';
import { AcercaService } from 'src/app/servicios/acerca.service';

@Component({
  selector: 'app-new-acerca',
  templateUrl: './new-acerca.component.html',
  styleUrls: ['./new-acerca.component.css']
})
export class NewAcercaComponent implements OnInit {

  descripcion: string ='';
  constructor(private sAcerca: AcercaService, private router:Router) { }

  ngOnInit(): void {
  }


  onCreate(): void{
    const acerca = new Acerca(this.descripcion);
    this.sAcerca.save(acerca).subscribe(data =>{
      alert("Se agregó perfecto");
      this.router.navigate(['']);
    }, err =>{
      alert("Fallo");
      this.router.navigate(['']);
    })
  }
}
