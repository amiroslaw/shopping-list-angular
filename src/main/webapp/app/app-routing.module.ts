import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {errorRoute} from './layouts/error/error.route';
import {navbarRoute} from './layouts/navbar/navbar.route';
import {DEBUG_INFO_ENABLED} from 'app/app.constants';
import {Authority} from 'app/config/authority.constants';

import {UserRouteAccessService} from 'app/core/auth/user-route-access.service';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
                [
                    {
                        path: 'admin',
                        data: {
                            authorities: [Authority.ADMIN],
                        },
                        canActivate: [UserRouteAccessService],
                        loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
                    },
                    {
                        path: 'login',
                        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                    },
                    {
                        data: { isPublic: true },
                        path: 'recipes',
                        loadChildren: () => import('./user/recipes/recipes.module').then(m => m.RecipesModule),
                    },
                    {
                        data: {
                            isPublic: false,
                            authorities: [Authority.USER],
                        },
                        path: 'user-recipes',
                        canActivate: [UserRouteAccessService],
                        loadChildren: () => import('./user/recipes/recipes.module').then(m => m.RecipesModule),
                    },
                    {
                        data: {
                            authorities: [Authority.USER],
                        },
                        canActivate: [UserRouteAccessService],
                        path: 'ingredients',
                        loadChildren: () => import('./user/ingredient/ingredient.module').then(m => m.IngredientModule),
                    },
                    {
                        data: {
                            authorities: [Authority.USER],
                        },
                        canActivate: [UserRouteAccessService],
                        path: 'shopping-lists',
                        loadChildren: () => import('./user/shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
                    },
                    ...LAYOUT_ROUTES,
                ],
                // {enableTracing: DEBUG_INFO_ENABLED}
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
