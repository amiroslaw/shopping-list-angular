import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe, RecipePage} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../layouts/toast/toast.service";
import {AccountService} from "../../../core/auth/account.service";
import {ITEMS_PER_PAGE} from "../../../config/pagination.constants";

@Component({
    selector: 'jhi-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    isCollapsed: boolean[] = [];
    recipes: Recipe[];
    isPublic: boolean;
    isRecommendationFilter: boolean;
    isAuthenticated: boolean;
    @ViewChild("searchInput") searchInput: ElementRef;

    totalItems = 0;
    itemsPerPage = ITEMS_PER_PAGE;
    page = 0;

    constructor(private recipesService: RecipesService, private router: Router, private activatedRoute: ActivatedRoute, private toastService: ToastService,
                private accountService: AccountService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.isPublic = data.isPublic;
            this.getRecipes(false);
        })
        this.isAuthenticated = this.accountService.isAuthenticated();
    }

    getRecipes(recommendation?: boolean, filter?: any) {
        let searchPattern = filter?.search ?? '';
        let recommendationParam = recommendation ?? false;
        if (this.isPublic) {
            this.recipesService.getPublicRecipes(this.page - 1, this.itemsPerPage, recommendationParam, searchPattern)
            .subscribe(i => this.assignVariablesFromResponse(i));
        } else {
            this.recipesService.getUserRecipes(this.page - 1, this.itemsPerPage, recommendationParam, searchPattern)
            .subscribe(i => this.assignVariablesFromResponse(i));
        }
    }

    onSearchRecipes(filter: any) {
        this.isRecommendationFilter = false;
        this.getRecipes(false, filter);
    }

    onClearFilter() {
        this.isRecommendationFilter = false;
        this.searchInput.nativeElement.value = '';
        this.getRecipes(false);
    }

    onRecommend() {
        this.isRecommendationFilter = true;
        this.getRecipes(true);
    }

    assignRecipe(recipe: Recipe) {
        this.recipesService.assignRecipeToUser(recipe).subscribe(
                res => this.toastService.showSuccess('Added recipe to your list ' + res.title),
                error => this.toastService.showError("Couldn't add recipe to your list")
        )
    }

    deleteRecipe(id: number) {
        this.recipesService.deleteRecipe(id).subscribe(
                res => this.recipes = this.recipes.filter((item) => item.id !== id),
                error => this.toastService.showError("Couldn't remove recipe")
        )

    }

    editRecipe(recipe: Recipe) {
        // console.log(JSON.stringify(recipe))
        // this.router.navigate(['user-recipes/update', {recipe: JSON.stringify(recipe)}]);
        this.router.navigate(['user-recipes/update'], {
            state: {recipe: recipe}
            // state: {recipe: 'test'}
        });
    }

    addIngredientToShoppingList(recipe: Recipe) {
        this.recipesService.addIngredientToShoppingList(recipe).subscribe(
                res => this.toastService.showSuccess('Added ingredients to your shopping list'),
                error => this.toastService.showError("Couldn't add ingredients to your shopping list")
        );

    }

    getDifficultyClass(difficulty: string): string {
        let cssClass: string;
        switch (difficulty) {
            case 'EASY':
                cssClass = 'bg-primary';
                break;
            case 'MODERATE':
                cssClass = 'bg-info';
                break;
            case 'HARD':
                cssClass = 'bg-dark';
                break;
            default:
                cssClass = 'bg-primary';
                break;
        }
        return cssClass;
    }

    private assignVariablesFromResponse(recipePage: RecipePage) {
        this.recipes = recipePage.content;
        this.page = recipePage.number + 1;
        this.itemsPerPage = recipePage.size;
        this.totalItems = recipePage.totalElements;
    }

}
