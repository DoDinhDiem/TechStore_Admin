import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SanphamService } from '../../service/sanpham.service';
import { ISanpham } from '../../api/sanpham';
import { LoaiService } from '../../service/loai.service';
import { IAnh } from '../../api/anhSanPham';
import { AnhspService } from '../../service/anhsp.service';
import { HangService } from '../../service/hang.service';

interface action {
    value: boolean;
    name: string;
}
interface statusProduct {
    name: string;
}

@Component({
    selector: 'app-sanpham',
    templateUrl: './sanpham.component.html',
    styleUrls: ['./sanpham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SanphamComponent {

    title = "Quản lý sản phẩm"
    sanpham: ISanpham;
    sanphams!: ISanpham[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: ISanpham[] | null;
    Save = "Lưu";
    shouldDisplayImage: boolean = false;
    //select của trạng thái hoạt động
    actions!: action[];
    selectAction!: action;

    //select của trạng thái sản phẩm
    status!: statusProduct[];
    selectStatus!: statusProduct;

    //select và hiển ở table của loại 
    loai: any[] = [];
    selectedLoaiId: any;

    //select và hiển ở table của hãng 
    hang: any[] = [];
    selectedHangId: any;

    //Key search
    keyword: any = "";
    minGiaBan: any = "";
    maxGiaBan: any = "";

    //Ảnh sản phẩm 
    anhSP!: IAnh;
    anhSPs!: IAnh[];

    fileOnly: any
    selectedFiles: any[];
    sequenceNumber = 0;

    //Thông số sản phẩm
    selectedItem: string; // Hoặc bất kỳ kiểu dữ liệu nào phù hợp
    productParameters: any[] = [];

    constructor(
        private sanphamService: SanphamService,
        private loaiService: LoaiService,
        private hangService: HangService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
        this.status = [
            { name: 'Sản phẩm thường' },
            { name: 'Sản phẩm mới' },
            { name: 'Sản phẩm hot' },
            { name: 'Sản phẩm Khuyến mại' }
        ]
        // this.loadDataImg(this.sanpham)
    }


    //Hiển thị dữ liệu
    loadData(keyword: string, minGiaBan: number, maxGiaBan: number) {
        this.loaiService.getAll().subscribe(data => {
            this.loai = data.map(item => ({
                id: item.id,
                name: item.tenLoai
            }));
        })
        this.hangService.getAll().subscribe(data => {
            this.hang = data.map(item => ({
                id: item.id,
                name: item.tenHang
            }));
        })
        this.sanphamService.search(keyword, minGiaBan, maxGiaBan).subscribe((data) => {
            this.sanphams = data
        })
    };

    //Nút ẩn hiện của sản phẩm
    toggleTrangThai(sanpham: ISanpham) {
        this.sanphamService.toggleTrangThai(sanpham.id).subscribe(() => {
            this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
        });
    }

    //Load lại khi tìm kiếm
    onKeywordInput() {
        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan)
    }

    //Đặt kiểu number cho giá trong tìm kiếm
    onKeyPress(event: any) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    //Mở dialog
    openNew() {
        this.fileOnly = [];
        this.selectedFiles = [];
        this.sanpham = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    //Xóa nhiều
    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các hãng sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((sanpham) => sanpham.id as number);
                    this.sanphamService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    //Mở dialog khi sửa
    edit(sanpham: ISanpham) {
        this.sanphamService.getById(sanpham.id).subscribe(
            data => {
                this.sanpham = data;
                this.shouldDisplayImage = true
                this.selectStatus = this.status.find(option => option.name === data.trangThaiSanPham);
                this.selectAction = this.actions.find(option => option.value == data.trangThaiHoatDong);
                this.selectedLoaiId = this.loai.find(option => option.name == data.loaiId);
                this.selectedHangId = this.hang.find(option => option.name == data.anhSanXuatId);
                this.selectedFiles = data.anhSanPhamList.map(item => ({ name: item.duongDanAnh }));
                this.fileOnly = data.anhSanPhamOnly.map(item => ({ name: item.duongDanAnh }));
                this.productParameters = data.thongSos.map(item => ({ tenThongSo: item.tenThongSo, moTa: item.moTa }))
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    //Xóa 1 sản phẩm
    deleteOnly(sanpham: ISanpham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + sanpham.tenSanPham + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sanphamService.delete(sanpham.id!).subscribe((res) => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                })
            }
        });
    }

    //Đóng dialog sản phẩm
    hidenDialog() {

        this.Dialog = false;
        this.sanpham = {};
        this.submitted = false;
    }

    //Thêm sửa sản phẩm
    save() {
        //Ảnh sản phẩm
        this.sanpham.anhSanPhams = [];
        for (let i = 0; i < this.fileOnly.length; i++) {
            const file = this.fileOnly[i];
            const img = {
                duongDanAnh: file.name,
                trangThai: true
            };
            this.sanpham.anhSanPhams.push(img);

        }
        for (let i = 0; i < this.selectedFiles.length; i++) {
            const file = this.selectedFiles[i];
            const img = {
                duongDanAnh: file.name,
                trangThai: false
            };
            this.sanpham.anhSanPhams.push(img);

        }
        //Thông số sản phẩm
        this.sanpham.thongSos = [];
        for (let i = 0; i < this.productParameters.length; i++) {
            const parameter = this.productParameters[i];
            const thongSo = {
                tenThongSo: parameter.tenThongSo,
                moTa: parameter.moTa,
                trangThai: true
            };
            this.sanpham.thongSos.push(thongSo);
        }

        this.sanpham.trangThaiHoatDong = this.selectAction?.value;
        this.sanpham.trangThaiSanPham = this.selectStatus?.name;
        this.sanpham.loaiId = this.selectedLoaiId.id;
        this.sanpham.hangSanXuatId = this.selectedHangId.id;
        this.submitted = true;
        if (this.sanpham.id) {
            this.sanphamService.update(this.sanpham).subscribe({
                next: res => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.hidenDialog();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            })
        }
        else {
            this.sanphamService.create(this.sanpham).subscribe({
                next: res => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.hidenDialog();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            });
        }
    }
    //Upload 

    onFilesSelected(event) {
        const files: FileList = event.target.files;
        this.selectedFiles = Array.from(files).map(file => {
            const newName = this.generateNewFileName(file.name);
            return new File([file], newName, { type: file.type });
        });
    }

    onFileOnly(event) {
        const files: FileList = event.target.files;
        this.fileOnly = Array.from(files).map(file => {
            const newName = this.generateNewFileName(file.name);
            return new File([file], newName, { type: file.type });
        });
        console.log('Chưa cho vào save: ', this.selectedFiles)
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime();
        const extension = oldFileName.split('.').pop();
        const newFileName = `product_${timestamp}_${this.sequenceNumber}.${extension}`;
        this.sequenceNumber++;
        return newFileName;
    }
    onUpload() {
        if (this.fileOnly && this.fileOnly.length > 0) {
            this.sanphamService.uploadFiles(this.fileOnly).subscribe({
                next: response => {
                    console.log('Upload ảnh đại diện thành công', response);
                },
                error: err => {
                    console.error('Lỗi upload', err);
                }
            })
        }
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.sanphamService.uploadFiles(this.selectedFiles).subscribe({

                next: response => {
                    console.log('Upload danh sách ảnh thành công', response);
                },
                error: err => {
                    console.error('Lỗi upload', err);
                }
            });
        }

    }

    //Thông số sản phẩm
    addProductParameter() {
        this.productParameters.push({
            tenThongSo: '',
            moTa: ''
        });
    }
    removeProductParameter(index: number) {
        this.productParameters.splice(index, 1);
    }

    //Ảnh sản phẩm


}
