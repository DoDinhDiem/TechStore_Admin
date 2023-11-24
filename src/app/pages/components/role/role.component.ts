import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IRole } from '../../api/role';
import { RoleService } from '../../service/role.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    providers: [MessageService, ConfirmationService]
})
export class RoleComponent {
    title = "Quản lý quyền"
    role!: IRole;
    roles!: IRole[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IRole[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    keyword: any = "";

    constructor(
        private roleService: RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit(): void {
        this.loadData(this.keyword);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
    }



    loadData(keyword: string) {
        this.roleService.search(keyword).subscribe((data) => {
            this.roles = data
        })
    };

    toggleTrangThai(role: IRole) {
        this.roleService.toggleTrangThai(role.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword)
    }
    openNew() {
        this.role = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các quyền đã chọn đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((role) => role.id as number);
                    this.roleService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    edit(role: IRole) {
        this.roleService.getById(role.id).subscribe(
            data => {
                this.role = data;
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    deleteOnly(role: IRole) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + role.tenRole + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.delete(role.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                })
            }
        });
    }

    hidenDialog() {

        this.Dialog = false;
        this.role = {};
        this.submitted = false;
    }

    save() {
        this.role.trangThai = this.selectAction?.value
        this.submitted = true;

        if (this.role.tenRole) {
            if (this.role.id) {
                this.roleService.update(this.role).subscribe({
                    next: res => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.roleService.create(this.role).subscribe({
                    next: res => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
        }
    }
}
