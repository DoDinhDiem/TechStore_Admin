import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./pages/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'admin/loai', loadChildren: () => import('./pages/components/loai/loai.module').then(m => m.LoaiModule) },
                    { path: 'admin/hang', loadChildren: () => import('./pages/components/hang/hang.module').then(m => m.HangModule) },
                    { path: 'admin/sanpham', loadChildren: () => import('./pages/components/sanpham/sanpham.module').then(m => m.SanphamModule) },
                    { path: 'admin/role', loadChildren: () => import('./pages/components/role/role.module').then(m => m.RoleModule) },
                    { path: 'admin/chucvu', loadChildren: () => import('./pages/components/chucvu/chucvu.module').then(m => m.ChucvuModule) },

                ]
            },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
