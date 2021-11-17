import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Recipe, RecipePage} from "./recipe.model";
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {Ingredient} from "../ingredient/ingredient.model";
import {ITEMS_PER_PAGE} from "../../config/pagination.constants";


@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    getUserRecipes( page: number, size: number, recommendation: boolean, filter?: string): Observable<RecipePage> {
        let options = this.buildParams(recommendation, filter, page, size);
        return this.http.get<RecipePage>(this.applicationConfigService.getEndpointFor('recipes'), options);
    }

    getPublicRecipes( page: number, size: number, recommendation: boolean, filter?: string): Observable<RecipePage> {
        let options = this.buildParams(recommendation, filter, page, size);
        return this.http.get<RecipePage>(this.applicationConfigService.getEndpointFor(`recipes/public`), options);
    }

    getRecipe(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(this.applicationConfigService.getEndpointFor(`recipes/${id}`));
    }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.applicationConfigService.getEndpointFor('recipes'), recipe);
    }

    updateRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.put<Recipe>(this.applicationConfigService.getEndpointFor('recipes'), recipe);
        // this.recipes[index] = newRecipe;
        // this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number): Observable<{}> {
        return this.http.delete(this.applicationConfigService.getEndpointFor(`recipes/${id}`));
        // this.recipes.splice(index, 1);
        // this.recipesChanged.next(this.recipes.slice());
    }

    assignRecipeToUser(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.applicationConfigService.getEndpointFor(`recipes/${recipe.id}`), recipe);
    }

    addIngredientToShoppingList(recipe: Recipe) {
        return this.http.post<Recipe>(this.applicationConfigService.getEndpointFor(`recipes:move`), recipe);
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.applicationConfigService.getEndpointFor('ingredients'))
    }

    private buildParams(recommendation: boolean, filter: string | undefined, page = 0, size= ITEMS_PER_PAGE ) {
        let params = new HttpParams().set('recommendation', recommendation);
        params =params.set('page', page)
       params = params.set('size', size)
        if (filter) {
            filter = filter?.trim() ?? '';
            params = params.set('filter', filter);
        }
        return  {params: params};
    }

}
