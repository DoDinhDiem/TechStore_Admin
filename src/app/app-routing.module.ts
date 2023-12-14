import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/layout/app.layout.component";
import { AuthGuard } from './Guard/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./pages/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
                    { path: 'admin/loai', loadChildren: () => import('./pages/components/loai/loai.module').then(m => m.LoaiModule), canActivate: [AuthGuard] },
                    { path: 'admin/hang', loadChildren: () => import('./pages/components/hang/hang.module').then(m => m.HangModule), canActivate: [AuthGuard] },
                    { path: 'admin/sanpham', loadChildren: () => import('./pages/components/sanpham/sanpham.module').then(m => m.SanphamModule), canActivate: [AuthGuard] },
                    { path: 'admin/role', loadChildren: () => import('./pages/components/role/role.module').then(m => m.RoleModule), canActivate: [AuthGuard] },
                    { path: 'admin/chucvu', loadChildren: () => import('./pages/components/chucvu/chucvu.module').then(m => m.ChucvuModule), canActivate: [AuthGuard] },
                    { path: 'admin/nhanvien', loadChildren: () => import('./pages/components/nhansu/nhansu.module').then(m => m.NhansuModule), canActivate: [AuthGuard] },
                    { path: 'admin/khachhang', loadChildren: () => import('./pages/components/khachhang/khachhang.module').then(m => m.KhachhangModule), canActivate: [AuthGuard] },
                    { path: 'admin/danhmuc', loadChildren: () => import('./pages/components/danhmuctintuc/danhmuctintuc.module').then(m => m.DanhmuctintucModule), canActivate: [AuthGuard] },
                    { path: 'admin/tintuc', loadChildren: () => import('./pages/components/tintuc/tintuc.module').then(m => m.TinTucModule), canActivate: [AuthGuard] },
                    { path: 'admin/hoadonnhap', loadChildren: () => import('./pages/components/hoadonnhap/hoadonnhap.module').then(m => m.HoadonnhapModule), canActivate: [AuthGuard] },
                    { path: 'admin/nhacungcap', loadChildren: () => import('./pages/components/nhacungcap/nhacungcap.module').then(m => m.NhacungcapModule), canActivate: [AuthGuard] },

                ]
                , canActivate: [AuthGuard]
            },
            { path: 'login', loadChildren: () => import('./pages/components/login/login.module').then(m => m.LoginModule), pathMatch: 'full' },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
