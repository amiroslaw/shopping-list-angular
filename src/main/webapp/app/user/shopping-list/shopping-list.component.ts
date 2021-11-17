import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../ingredient/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {IngredientFormComponent} from "../ingredient-form/ingredient-form.component";
import {ToastService} from "../../layouts/toast/toast.service";

@Component({
    selector: 'jhi-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

    @ViewChild(IngredientFormComponent) ingredientForm: IngredientFormComponent;
    editedIngredient: Ingredient;
    ingredients: Ingredient[];
    purchasedIngredients: Ingredient[];

    constructor(private toastService: ToastService, private shoppingListService: ShoppingListService) {
    }

    ngOnInit(): void {
        this.shoppingListService.getIngredients().subscribe(i => this.ingredients = i);
        this.shoppingListService.getPurchasedIngredients().subscribe(i => this.purchasedIngredients = i);
    }

    onSubmit($event: { ingredient: Ingredient; addingMode: boolean }) {
        if ($event.addingMode) {
            this.shoppingListService.addIngredient($event.ingredient).subscribe(
                    res => this.ingredients.push(res),
                    error => this.toastService.showError("Couldn't update table")
            );
        } else {
            this.shoppingListService.updateIngredient($event.ingredient).subscribe(
                    res => {
                        let index = this.ingredients.findIndex((obj => obj.id == $event.ingredient.id));
                        this.ingredients.splice(index, 1);
                        this.ingredients.push(res)
                    },
                    error => this.toastService.showError("Couldn't update table")
            );
        }
    }

    addIngredient(ingredient: Ingredient) {
        this.shoppingListService.addIngredient(ingredient).subscribe(res => this.ingredients.push(res));
    }

    onRemoveIngredient(ingredientId: number) {
        this.shoppingListService.removeIngredientShoppingList(ingredientId).subscribe(
                res => this.ingredients = this.ingredients.filter((item) => item.id !== ingredientId),
                error => this.toastService.showError("Couldn't remove ingredient from the list")
        );
    }

    onEditIngredient(ingredient: Ingredient) {
        this.editedIngredient = ingredient;
        this.ingredientForm.onEditIngredient(ingredient);
    }

    onRemovePurchasedIngredient(ingredientId: number) {
        this.shoppingListService.removePurchasedIngredient(ingredientId).subscribe(
                res => this.purchasedIngredients = this.purchasedIngredients.filter((item) => item.id !== ingredientId),
                error => this.toastService.showError("Couldn't remove ingredient from the list")
        );
    }

    onRemoveAllPurchasedIngredient() {
        this.purchasedIngredients.forEach(i => this.onRemovePurchasedIngredient(i.id));
    }

    onRemoveAllIngredient() {
        this.ingredients.forEach(i => this.onRemoveIngredient(i.id));
    }

    onApprove(ingredientId: number) {
        this.shoppingListService.purchaseIngredient(ingredientId).subscribe(
                res => {
                    let index = this.ingredients.findIndex(i => i.id === ingredientId);
                    this.purchasedIngredients.push(this.ingredients[index]);
                    this.ingredients = this.ingredients.filter((item) => item.id !== ingredientId);
                },
                error => this.toastService.showError("Couldn't remove ingredient from the list")
        );
    }

    onApproveAll() {
        this.ingredients.forEach(i => this.onApprove(i.id));
    }

    onUndoPurchase(ingredientId: number) {
        this.shoppingListService.undoPurchase(ingredientId).subscribe(
                res => {
                    let index = this.purchasedIngredients.findIndex(i => i.id === ingredientId);
                    this.ingredients.push(this.purchasedIngredients[index]);
                    this.purchasedIngredients = this.purchasedIngredients.filter((item) => item.id !== ingredientId);
                },
                error => this.toastService.showError("Couldn't undo ingredient from the list")
        );
    }

    onUndoPurchases() {
        this.purchasedIngredients.forEach(i => this.onUndoPurchase(i.id));
    }

    onSendIngredientToUserList(ingredientId: number) {
        this.shoppingListService.onSendAllIngredientsToUserList(ingredientId)
        .subscribe(
                res => this.purchasedIngredients = this.purchasedIngredients.filter((item) => item.id !== ingredientId),
                error => this.toastService.showError("Couldn't execute")
        )

    }

    onSendAllIngredientsToUserList() {
        this.purchasedIngredients.forEach(i => this.onSendIngredientToUserList(i.id));
    }
}
