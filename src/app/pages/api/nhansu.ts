export interface INhanSu {
    //Tài khoản
    id?: number;
    userName?: string;
    passWord?: string;
    email?: string;
    roleId?: number;
    //Nhân viên
    userId?: number;
    firstName?: string;
    lastName?: string;
    soDienThoai?: string;
    diaChi?: string;
    ngaySinh?: Date;
    gioiTinh?: string;
    ngayVaoLam?: Date;
    avartar?: string;
    trangThai?: boolean;
    chucVuId?: number
    createDate?: string;
    updateDate?: string;
}
