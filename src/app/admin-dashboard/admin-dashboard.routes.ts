import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { ProductsAdminPages } from "./pages/products-admin-pages/products-admin-pages";
import { ProductAdminPages } from "./pages/product-admin-pages/product-admin-pages";
import { isAdminGuard } from "../auth/guards/isAdmin.guard";

export const adminDashboardRoutes: Routes = [ 
    {
        path:'',
        component: AdminDashboardLayout,
        canMatch: [isAdminGuard],
        children: [
            {
                path: 'products',
                component: ProductsAdminPages
            },
            {
                path: 'product/:id',
                component: ProductAdminPages
            },
            {
                path: '**',
                redirectTo: 'products'
            }
        ]
    }


]

export default adminDashboardRoutes