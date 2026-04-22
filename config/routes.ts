export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/quan-ly-san-pham',
		name: 'QuanLySanPham',
		icon: 'AppstoreAddOutlined',
		component: './QuanLySanPham',
	},
	{
		path: '/quan-ly-don-hang',
		name: 'QuanLyDonHang',
		icon: 'AppstoreAddOutlined',
		component: './QuanLyDonHang',
	},
	{
		path: '/tro-choi-doan-so',
		name: 'TroChoiDoanSo',
		icon: 'RocketOutlined',
		component: './TH01/Bai1_TroChoiDoanSo',
	},
	{
		path: '/quan-ly-tien-do',
		name: 'QuanLyTienDo',
		icon: 'ReadOutlined',
		component: './TH01/Bai2_QuanLyTienDo',
	},
	{
		path: '/oan-tu-ti',
		name: 'OanTuTi',
		icon: 'SmileOutlined',
		component: './TH02/Bai1_OanTuTi',
	},
	{
		path: '/ngan-hang-cau-hoi',
		name: 'NganHangCauHoi',
		icon: 'DatabaseOutlined',
		component: './TH02/Bai2_NganHangCauHoi',
	},

	{
		path: '/dich-vu',
		name: 'DichVu',
		icon: 'SettingOutlined',
		component: './TH03',
	},

	{
		path: '/van-bang',
		name: 'VanBang',
		icon: 'BookOutlined',
		component: './TH04',
	},

	{
		path: '/quan-ly-clb',
		name: 'QuanLyCLB',
		icon: 'TeamOutlined',
		component: './TH05',
	},

	{
		path: '/ke-hoach-du-lich',
		name: 'KeHoachDuLich',
		icon: 'GlobalOutlined',
		component: './TH06',
	},

	{
		path: '/quan-ly-phong-hoc',
		name: 'KTGK - Quản Lý Phòng Học',
		icon: 'BankOutlined',
		component: './KTGK',
	},

	{
		path: '/blog-ca-nhan',
		name: 'Blog Cá Nhân',
		icon: 'ReadOutlined',
		component: './TH07',
	},

	///////////////////////////////////

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
