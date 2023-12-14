import { Component } from '@angular/core';
import { IHoaDonNhap } from '../../api/hoadonnhap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HoaDonNhapService } from '../../service/hoadonnhap.service';
import { SanphamService } from '../../service/sanpham.service';
import { NhaCungcapService } from '../../service/nhacungcap.service';
import { AccountService } from '../../service/account.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-hoadonnhap',
    templateUrl: './hoadonnhap.component.html',
    styleUrls: ['./hoadonnhap.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class HoaDonNhapComponent {
    title = "Quản lý sản phẩm"
    hoadonnhap: IHoaDonNhap = {};
    hoadonnhaps!: IHoaDonNhap[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IHoaDonNhap[] | null;
    Save = "Lưu";
    shouldDisplayImage: boolean = false;
    //select của trạng thái hoạt động
    actions!: action[];
    selectAction!: action;

    //select của trạng thái sản phẩm
    // status!: statusProduct[];
    // selectStatus!: statusProduct;

    //select và hiển ở table của loại 
    sanpham: any[] = [];
    selectedSanPhamId: any;

    //select và hiển ở table của 
    nhacungcap: any[] = [];
    selectedNhaCungCapId: any;

    //Key search
    selectedItem: string;
    orderDetail: any[] = [];

    constructor(
        private hoadonnhapService: HoaDonNhapService,
        private sanphamService: SanphamService,
        private nhacungcapService: NhaCungcapService,
        private accontService: AccountService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {

        this.loadData();

        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
    }


    //Hiển thị dữ liệu
    loadData() {
        this.sanphamService.getAll().subscribe(data => {
            this.sanpham = data.map(item => ({
                id: item.id,
                name: item.tenSanPham
            }));
        })
        this.nhacungcapService.getAll().subscribe(data => {
            this.nhacungcap = data.map(item => ({
                id: item.id,
                name: item.tenNhaCungCap
            }));
            console.log(this.nhacungcap)
        })

        this.hoadonnhapService.search().subscribe(data => {
            this.hoadonnhaps = data
        })
    };

    //Mở dialog
    openNew() {
        this.hoadonnhap = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }


    //Mở dialog khi sửa
    edit(hoadonnhap: IHoaDonNhap) {
        this.hoadonnhapService.getById(hoadonnhap.id).subscribe(
            data => {
                this.hoadonnhap = data;
                this.shouldDisplayImage = true
                // this.selectStatus = this.status.find(option => option.name === data.trangThaIHoaDonNhap);
                this.selectAction = this.actions.find(option => option.value == data.trangThaiHoatDong);
                this.selectedSanPhamId = this.sanpham.find(option => option.name == data.sanphamId);
                // this.selectedHangId = this.hang.find(option => option.name == data.anhSanXuatId);
                this.orderDetail = data.chiTietHoaDonNhap
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    //Đóng dialog sản phẩm
    hidenDialog() {
        this.Dialog = false;
        this.hoadonnhap = {};
        this.submitted = false;
    }

    //Thêm sửa sản phẩm
    save() {
        this.hoadonnhap.userId = Number(this.accontService.getUserId());

        this.hoadonnhap.chiTietHoaDonNhap = [];
        for (let i = 0; i < this.orderDetail.length; i++) {
            const order = this.orderDetail[i];
            const soLuong: number = Number(order.soLuongNhap);
            const giaNhap: number = Number(order.giaNhap);
            const chitiet = {
                sanPhamId: order.selectedSanPhamId.id,
                soLuong: order.soLuongNhap,
                giaNhap: order.giaNhap,
                thanhTien: soLuong * giaNhap
            };
            this.hoadonnhap.chiTietHoaDonNhap.push(chitiet);
        }
        this.submitted = true;
        this.hoadonnhapService.create(this.hoadonnhap).subscribe({
            next: res => {
                this.loadData();
                this.hidenDialog();
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
            },
            error: err => {
                this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
            }
        });
    }

    //Thông số sản phẩm
    addProductOrder() {
        this.orderDetail.push({
            selectedSanPhamId: "",
            soLuongNhap: "",
            giaNhap: ""
        });
    }
    removeProductOrder(index: number) {
        this.orderDetail.splice(index, 1);
    }


    //Thông số sản phẩm
    // thongso!: IThongSo;
    // thongsos!: IThongSo[];
    // Dialogorder: boolean = false;
    // DialogorderDetail: boolean = false;
    // titleorder = "Quản lý thông số sản phẩm";
    // selectedorder: IThongSo[] | null;

    // openorder(hoadonnhap: IHoaDonNhap) {
    //     this.Dialogorder = true
    //     this.currenthoadonnhapId = hoadonnhap.id
    //     this.loadorder(hoadonnhap.id)
    // }

    // loadorder(id: any) {
    //     this.thongsoService.getAll(id).subscribe(data => {
    //         this.thongsos = data
    //     })
    // }

    // //Xóa nhiều
    // deleteSelectedorder() {
    //     this.confirmationService.confirm({
    //         message: 'Bạn có chắc chắn muốn xóa các thông số sản phẩm đã chọn?',
    //         header: 'Thông báo',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             if (this.selectedorder) {
    //                 const ids = this.selectedorder.map((thongso) => thongso.id as number);
    //                 this.thongsoService.deleteMany(ids).subscribe((res) => {
    //                     this.loadorder(res.id[0]);
    //                     this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
    //                 });
    //             }
    //         }
    //     });
    // }

    // //Xóa 1 sản phẩm
    // deleteOnlyorder(thongso: IThongSo) {
    //     this.confirmationService.confirm({
    //         message: 'Bạn có chắc chắn muốn xóa ' + thongso.tenThongSo + '?',
    //         header: 'Thông báo',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.thongsoService.delete(thongso.id!).subscribe((res) => {
    //                 this.loadorder(res.id);
    //                 this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
    //             })
    //         }
    //     });
    // }
    // toggleTrangThaiorder(thongso: IThongSo) {
    //     this.thongsoService.toggleTrangThai(thongso.id).subscribe((data) => {
    //         this.loadorder(data.id);
    //     });
    // }
    // openorderDetail() {
    //     this.thongso = {};
    //     this.DialogorderDetail = true
    //     this.submitted = false;
    //     this.Save = 'Lưu'
    // }
    // hidenDialogorder() {
    //     this.DialogorderDetail = false;
    //     this.thongso = {};
    //     this.submitted = false;
    // }
    // editorder(thongso: IThongSo) {
    //     this.thongsoService.getById(thongso.id).subscribe(
    //         data => {
    //             this.thongso = data;
    //             this.DialogorderDetail = true;
    //             this.Save = "Cập nhập";
    //         }
    //     )
    // }
    // saveorder() {
    //     this.thongso.hoadonnhapId = this.currenthoadonnhapId
    //     this.thongso.trangThai = this.selectAction?.value;
    //     this.submitted = true;
    //     if (this.thongso.id) {
    //         this.thongsoService.update(this.thongso).subscribe({
    //             next: res => {
    //                 this.loadorder(this.currenthoadonnhapId);
    //                 this.hidenDialogorder();
    //                 this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
    //             },
    //             error: err => {
    //                 this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
    //             }
    //         })
    //     }
    //     else {
    //         this.thongsoService.create(this.thongso).subscribe({
    //             next: res => {
    //                 this.loadorder(this.currenthoadonnhapId);
    //                 this.hidenDialogorder();
    //                 this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
    //             },
    //             error: err => {
    //                 this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
    //             }
    //         });
    //     }
    // }
    // onDialogHide() {
    //     this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
    // }

}
