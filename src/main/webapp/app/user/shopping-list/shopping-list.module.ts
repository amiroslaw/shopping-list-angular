import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import {FormsModule} from "@angular/forms";
import {IngredientModule} from "../ingredient/ingredient.module";


@NgModule({
  declarations: [
    ShoppingListComponent
  ],
    imports: [
        CommonModule,
        ShoppingListRoutingModule,
        FormsModule,
        IngredientModule
    ]
})
export class ShoppingListModule { }
