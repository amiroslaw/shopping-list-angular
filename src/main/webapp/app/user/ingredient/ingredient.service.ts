import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {Ingredient} from "./ingredient.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class IngredientService {

    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    getIngredients(): Observable<string[]> {
        return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('ingredients'))
    }

    getUnits() : Observable<string[]> {
        return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('unit-of-measures'))
    }

    getUserIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.applicationConfigService.getEndpointFor('user-ingredients'))
    }

    addIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(this.applicationConfigService.getEndpointFor('user-ingredients'), ingredient)
    }

    updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.put<Ingredient>(this.applicationConfigService.getEndpointFor(`user-ingredients/${ingredient.id}`), ingredient)
    }

    removeIngredientFromUserList(ingredientId: number): Observable<Ingredient> {
        return this.http.delete<Ingredient>(this.applicationConfigService.getEndpointFor(`user-ingredients/${ingredientId}`))
    }

    addIngredientToShoppingList(ingredientId: number) {
        return this.http.post<Ingredient>(this.applicationConfigService.getEndpointFor(`user-ingredients/${ingredientId}`), ingredientId)
    }
}
