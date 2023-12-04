import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Sản phẩm',
                items: [
                    { label: 'Loại sản phẩm', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/loai'] },
                    { label: 'Hãng sản phẩm', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/hang'] },
                    { label: 'Sản phẩm', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/sanpham'] },

                ]
            },
            {
                label: 'Bài viết',
                items: [
                    { label: 'Danh mục tin tức', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/danhmuc'] },
                    { label: 'Tin tức', icon: 'pi pi-fw pi-globe', routerLink: ['/admin/tintuc'] },
                ]
            },
            {
                label: 'Con người',
                items: [
                    { label: 'Nhân viên', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/nhanvien'] },
                    { label: 'Khách hàng', icon: 'pi pi-fw pi-globe', routerLink: ['/admin/khachhang'] },
                ]
            },
            {
                label: 'Hóa đơn',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Báo cáo, thống kê',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Phân loại',
                items: [
                    { label: 'Quyền', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/role'] },
                    { label: 'Chức vụ', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/chucvu'] },
                ]
            },

        ];
    }
}
