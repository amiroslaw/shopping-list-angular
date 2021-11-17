import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../ingredient/ingredient.model";
import {ToastService} from "../../layouts/toast/toast.service";
import {IngredientService} from "../ingredient/ingredient.service";

@Component({
    selector: 'jhi-ingredient-form',
    templateUrl: './ingredient-form.component.html',
    styleUrls: ['./ingredient-form.component.scss']
})
export class IngredientFormComponent implements OnInit {

    @ViewChild("submitButton") editForm: ElementRef;
    @ViewChild("amount") amountInputElement: ElementRef;
    @ViewChild("name") nameInputElement: ElementRef;
    @ViewChild("unit") unitInputElement: ElementRef;
    @Output() submitEmitter: EventEmitter<{ ingredient: Ingredient, addingMode: boolean }> = new EventEmitter<{ ingredient: Ingredient, addingMode: boolean }>();
    availableIngredients: string[];
    availableUnits: string[];
    isAddingMode: boolean = true;
    private editedIngredientId: number;
    readonly DEFAULT_UNIT = 'piece';

    constructor(private toastService: ToastService, private ingredientService: IngredientService) {
    }

    ngAfterViewInit(): void {
        // let selected : HTMLElement[] = this.unitInputElement.nativeElement.getElementsByTagName('option')
        // selected.filter(value => value.nodeValue === this.DEFAULT_UNIT)
        // .setAttribute('selected', 'true')
    }

    ngOnInit(): void {
        this.ingredientService.getIngredients().subscribe(i => this.availableIngredients = i);
        this.ingredientService.getUnits().subscribe(i => this.availableUnits = i);
    }

    onEditIngredient(ingredient: Ingredient) {
        this.nameInputElement.nativeElement.value = ingredient.name;
        this.amountInputElement.nativeElement.value = ingredient.amount;
        this.unitInputElement.nativeElement.value = ingredient.unit.toLowerCase();
        this.editedIngredientId = ingredient.id;
        this.nameInputElement.nativeElement.focus()
        this.isAddingMode = false;
        this.editForm.nativeElement.disabled = false;
    }

    onSubmit(ingredient: Ingredient) {
        if (!this.isAddingMode) {
            ingredient.id = this.editedIngredientId;
            ingredient.name = this.nameInputElement.nativeElement.value;
            ingredient.amount = this.amountInputElement.nativeElement.value;
            ingredient.unit = this.unitInputElement.nativeElement.value;
        }
        this.submitEmitter.emit({ingredient: ingredient, addingMode: this.isAddingMode});
        this.isAddingMode = true;
        this.resetForm();
    }


    private resetForm() {
        this.amountInputElement.nativeElement.value = '';
        this.nameInputElement.nativeElement.value = '';
        this.unitInputElement.nativeElement.value = this.DEFAULT_UNIT
    }

}
