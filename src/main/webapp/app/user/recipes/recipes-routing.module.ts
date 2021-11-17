import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from "./list/recipes.component";
import {RecipesUpdateComponent} from "./recipes-update/recipes-update.component";

const routes: Routes = [
    {path: '', component: RecipesComponent},
    {path: 'update', component: RecipesUpdateComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class RecipesRoutingModule {
}
