import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {ToastService} from "../../../layouts/toast/toast.service";
import {Recipe} from "../recipe.model";
import {IngredientService} from "../../ingredient/ingredient.service";

@Component({
    selector: 'jhi-recipes-update',
    templateUrl: './recipes-update.component.html',
    styleUrls: ['./recipes-update.component.scss']
})
export class RecipesUpdateComponent implements OnInit {
    recipeForm: FormGroup;
    private editedRecipe: Recipe;
    availableIngredients: string[];
    availableUnits: string[];
    readonly DEFAULT_UNIT = 'piece';

    constructor(private route: ActivatedRoute,
                private recipeService: RecipesService,
                private router: Router,
                private ingredientService: IngredientService,
                private toastService: ToastService) {
        this.editedRecipe = this.router.getCurrentNavigation()?.extras.state?.recipe;
        this.ingredientService.getUnits().subscribe(i => this.availableUnits = i);
    }

    ngOnInit() {
        this.ingredientService.getIngredients().subscribe(i => this.availableIngredients = i);
        this.initForm();
    }

    onSubmit() {
        let recipe = this.recipeForm.value;
        if (this.editedRecipe) {
            recipe.id = this.editedRecipe.id;

            this.recipeService.updateRecipe(recipe).subscribe(
                    res => this.onNavigateToRecipeList(),
                    error => this.toastService.showError("Couldn't update")
            )
        } else {
            this.recipeService.addRecipe(recipe).subscribe(
                    res => this.onNavigateToRecipeList(),
                    error => this.toastService.showError("Couldn't create")
            )
        }
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
                new FormGroup({
                    'name': new FormControl(null, Validators.required),
                    'amount': new FormControl(null, [
                        Validators.required,
                        Validators.min(0.001),
                            Validators.pattern(/\d+(?:[.,]\d{0,2})?/)
                    ]),
                    'unit': new FormControl(this.DEFAULT_UNIT),
                })
        );
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onNavigateToRecipeList() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    private initForm() {
        let recipeTitle = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);
        let recipeDifficulty: string = 'EASY';
        let recipeVisible: boolean = true;

        if (this.editedRecipe) {
            recipeTitle = this.editedRecipe.title;
            recipeImagePath = this.editedRecipe.imgUrl;
            recipeDescription = this.editedRecipe.description;
            recipeDifficulty = this.editedRecipe.difficulty;
            recipeVisible = this.editedRecipe.visible;
            if (this.editedRecipe['ingredients']) {
                for (let ingredient of this.editedRecipe.ingredients) {
                    recipeIngredients.push(
                            new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount, [
                                    Validators.required,
                                    Validators.min(0.001),
                                    Validators.pattern(/\d+(?:[.]\d{0,2})?/)
                                ]),
                                'unit': new FormControl(ingredient.unit.toLowerCase()),
                            })
                    );
                }
            }
        }
        this.recipeForm = new FormGroup({
            'title': new FormControl(recipeTitle, Validators.required),
            'imgUrl': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'difficulty': new FormControl(recipeDifficulty),
            'visible': new FormControl(recipeVisible),
            'ingredients': recipeIngredients
        });
    }

    getControls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }
}
