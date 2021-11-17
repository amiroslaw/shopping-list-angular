import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IngredientRoutingModule} from './ingredient-routing.module';
import {IngredientComponent} from './ingredient.component';
import {IngredientListComponent} from "../ingredient-list/ingredient-list.component";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppModule} from "../../app.module";
import {IngredientFormComponent} from "../ingredient-form/ingredient-form.component";

@NgModule({
    declarations: [
        IngredientComponent,
        IngredientListComponent,
        IngredientFormComponent
    ],
    imports: [
        CommonModule,
        IngredientRoutingModule,
        FormsModule,
        FontAwesomeModule,
    ],
    exports: [
        IngredientListComponent,
        IngredientFormComponent
    ]
})
export class IngredientModule {
}
