const ADMIN = '/admin'
export const PATH = {
    detail:'/nhan-su/:id',
    admin: {
        personnel: ADMIN + '/nhan-su',
        personnelDetail: ADMIN + '/nhan-su/:id',
        tean: ADMIN + '/bo-phan',
        notification: ADMIN + '/thong-bao',
        resgiterUser : ADMIN + '/dang-ky-thanh-vien',
        statistical : ADMIN + '/thong-ke',
    }
}