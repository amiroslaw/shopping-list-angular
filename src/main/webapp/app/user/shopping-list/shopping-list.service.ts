import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {Observable} from "rxjs";
import {Ingredient} from "../ingredient/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.applicationConfigService.getEndpointFor('shopping-lists/1/ingredients'))
    }

    addIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(this.applicationConfigService.getEndpointFor('shopping-lists/1/ingredients'), ingredient)
    }

    updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.put<Ingredient>(this.applicationConfigService.getEndpointFor(`shopping-lists/1/ingredients/${ingredient.id}`), ingredient)
    }

    removeIngredientShoppingList(ingredientId: number): Observable<Ingredient> {
        return this.http.delete<Ingredient>(this.applicationConfigService.getEndpointFor(`shopping-lists/1/ingredients/${ingredientId}`))
    }

    purchaseIngredient(ingredientId: number) {
        return this.http.post<Ingredient>(this.applicationConfigService.getEndpointFor(`shopping-lists/1/ingredients/${ingredientId}`), ingredientId)
    }

    getPurchasedIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.applicationConfigService.getEndpointFor('purchased-lists/1/ingredients'))
    }

    removePurchasedIngredient(ingredientId: number) {
        return this.http.delete<Ingredient>(this.applicationConfigService.getEndpointFor(`purchased-lists/1/ingredients/${ingredientId}`))
    }

    undoPurchase(ingredientId: number): Observable<Ingredient> {
        return this.http.post<Ingredient>(this.applicationConfigService.getEndpointFor(`purchased-lists/1/ingredients/${ingredientId}`), ingredientId)
    }

    onSendAllIngredientsToUserList(ingredientId: number): Observable<Ingredient> {
        return this.http.put<Ingredient>(this.applicationConfigService.getEndpointFor(`purchased-lists/1/ingredients/${ingredientId}`), ingredientId)
    }
}
