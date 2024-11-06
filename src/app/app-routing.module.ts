import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NgModule} from "@angular/core";
import {Squares} from "./components/mini-games/squares/squares";

 const routes: Routes =[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "squares",
    component: Squares,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
