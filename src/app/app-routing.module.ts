import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAcercaComponent } from './componentes/acerca-de/edit-acerca.component';
import { NewAcercaComponent } from './componentes/acerca-de/new-acerca.component';
import { EditeducacionComponent } from './componentes/educacion/editeducacion.component';
import { NeweducacionComponent } from './componentes/educacion/neweducacion.component';
import { EditEncabComponent } from './componentes/encabezado/edit-encab.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditSkillComponent } from './componentes/hys/edit-skill.component';
import { NewSkillComponent } from './componentes/hys/new-skill.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditproyectComponent } from './componentes/proyectos/editproyect.component';
import { NewproyectoComponent } from './componentes/proyectos/newproyecto.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent}, //httt://localhost:4200/login me lleva al login, asi como lo escribis en el path es como tenes que ponerlo en el link
  {path: 'nuevaexp', component: NewExperienciaComponent},
  {path: 'editexp/:id' , component: EditExperienciaComponent},
  {path: 'nuevaedu' , component: NeweducacionComponent},
  {path: 'editedu/:id' , component: EditeducacionComponent},
  {path: 'newskill', component: NewSkillComponent},
  {path: 'editskill/:id', component: EditSkillComponent},
  {path: 'nuevoacerca', component: NewAcercaComponent},
  {path: 'editacerca/:id', component: EditAcercaComponent},
  {path: 'editperson/:id', component: EditEncabComponent},
  {path: 'nuevoproyecto', component: NewproyectoComponent},
  {path: 'editproyect/:id', component: EditproyectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
