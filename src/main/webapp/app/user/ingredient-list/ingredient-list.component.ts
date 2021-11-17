import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ingredient} from "../ingredient/ingredient.model";
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent {

    @Input() ingredients: Ingredient[];
    @Input() isPurchasedList: boolean = false;
    @Output() ingredientRemoved: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientsRemoved: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientApproved: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientsApproved: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientsUndo: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientUndo: EventEmitter<number> = new EventEmitter<number>();
    @Output() ingredientEdited: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

    constructor(private router: Router) {
    }

    editIngredient(ingredient: Ingredient) {
        this.ingredientEdited.emit(ingredient);
    }

    removeIngredient(id: number) {
        this.ingredientRemoved.emit(id);
    }

    removeAllIngredients() {
        this.ingredientsRemoved.emit();
    }

    approve(ingredientId: number) {
        this.ingredientApproved.emit(ingredientId);
    }

    approveAll() {
        this.ingredientsApproved.emit();
    }

    isShoppingPage() {
        return this.router.url.includes('shopping');
    }

    undoAll() {
        this.ingredientsUndo.emit();
    }

    undo(ingredientId: number) {
        this.ingredientUndo.emit(ingredientId);
    }
}
