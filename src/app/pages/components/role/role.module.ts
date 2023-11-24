import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RoleComponent }
    ])],
    exports: [RouterModule]
})
export class RoleModule { }
