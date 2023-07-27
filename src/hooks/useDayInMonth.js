export const useDayInMonth = () => {
    // const [days,setDays] = useState([])
    let days = []
    // Lấy ngày hiện tại
    var ngayHienTai = new Date();

    // Lấy số ngày trong tháng hiện tại
    var soNgayTrongThang = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth() + 1, 0).getDate();

    // Tạo danh sách ngày trong tháng hiện tại
    var danhSachNgay = [];
    for (var i = 1; i <= soNgayTrongThang; i++) {
        var ngay = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth(), i);
        var ngayFormat = ngay.getDate().toString().padStart(2, '0');
        var thangFormat = (ngay.getMonth() + 1).toString().padStart(2, '0');
        var namFormat = ngay.getFullYear().toString();
        var ngayThangNam = ngayFormat + '-' + thangFormat + '-' + namFormat;
        danhSachNgay.push(ngayThangNam);
    }

    // In danh sách ngày
    for (var j = 0; j < danhSachNgay.length; j++) {
        days.push(danhSachNgay[j])
    }
    return days
}