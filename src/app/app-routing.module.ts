import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ProductComponent } from './components/products/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'products', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },
  { 
    path: 'products', 
    component: ProductComponent 
  },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [adminGuard] 
  },
  { 
    path: '**', 
    redirectTo: 'products' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }