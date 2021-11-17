import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesComponent} from './list/recipes.component';
import {RecipesRoutingModule} from "./recipes-routing.module";
import {NgbCollapseModule, NgbToastModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {RecipesUpdateComponent} from "./recipes-update/recipes-update.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastComponent} from "../../layouts/toast/toast.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesUpdateComponent,
        ToastComponent
    ],
    exports: [
        ToastComponent
    ],
    imports: [
        CommonModule,
        RecipesRoutingModule,
        NgbCollapseModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbToastModule,
        NgbTooltipModule,
        SharedModule
    ]
})
export class RecipesModule {
}
