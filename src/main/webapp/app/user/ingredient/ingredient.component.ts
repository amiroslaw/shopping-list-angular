import {Component, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from "./ingredient.service";
import {Ingredient} from "./ingredient.model";
import {ToastService} from "../../layouts/toast/toast.service";
import {IngredientFormComponent} from "../ingredient-form/ingredient-form.component";


@Component({
    selector: 'jhi-ingredient',
    templateUrl: './ingredient.component.html',
    styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
    @ViewChild(IngredientFormComponent) ingredientForm: IngredientFormComponent;
    ingredients: Ingredient[];
    editedIngredient: Ingredient;

    constructor(private toastService: ToastService, private ingredientService: IngredientService) {
    }

    ngOnInit(): void {
        this.ingredientService.getUserIngredients().subscribe(i => this.ingredients = i);
    }

    onSubmit($event: { ingredient: Ingredient; addingMode: boolean }) {
        if ($event.addingMode) {
            this.ingredientService.addIngredient($event.ingredient).subscribe(
                    res => this.ingredients.push(res),
                    error => this.toastService.showError("Couldn't update.\n" + error.error)
            );
        } else {
            this.ingredientService.updateIngredient($event.ingredient).subscribe(
                    res => {
                        let index = this.ingredients.findIndex((obj => obj.id == $event.ingredient.id));
                        this.ingredients.splice(index,1);
                        this.ingredients.push(res)
                    },
                    error => this.toastService.showError("Couldn't update.\n" + error.error)
            );
        }
    }

    onRemoveIngredient(ingredientId: number) {
        this.ingredientService.removeIngredientFromUserList(ingredientId).subscribe(
                res => this.ingredients = this.ingredients.filter((item) => item.id !== ingredientId),
                error => this.toastService.showError("Couldn't remove ingredient from the list")
        )
    }

    onRemoveAllIngredient() {
        this.ingredients.forEach(i => this.onRemoveIngredient(i.id));
    }

    onApprove(ingredientId: number) {
        this.ingredientService.addIngredientToShoppingList(ingredientId).subscribe(
                res => this.ingredients = this.ingredients.filter((item) => item.id !== ingredientId),
                error => this.toastService.showError("Couldn't remove ingredient from the list")
        )
    }

    onApproveAll() {
        this.ingredients.forEach(i => this.onApprove(i.id));
    }

    onEditIngredient(ingredient: Ingredient) {
        this.editedIngredient = ingredient;
        this.ingredientForm.onEditIngredient(ingredient);
    }
}
