import { ETrangThai, IBaiViet, IThe } from '../types';

export const DS_TRANG_THAI = [
	{ label: 'Nháp', value: ETrangThai.BanNhap },
	{ label: 'Đã đăng', value: ETrangThai.DaDang },
];

export const MAU_TRANG_THAI: Record<ETrangThai, string> = {
	[ETrangThai.BanNhap]: 'orange',
	[ETrangThai.DaDang]: 'green',
};

export const MAU_THE: string[] = [
	'magenta', 'red', 'volcano', 'orange', 'gold',
	'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
];

export const SO_BAI_MOI_TRANG = 9;

export const THONG_TIN_TAC_GIA = {
	ten: 'Nguyễn Lê Anh',
	anhDaiDien: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
	tieuSu:
		'Một lập trình viên đam mê công nghệ, yêu thích chia sẻ kiến thức qua các bài viết blog. Với hơn 3 năm kinh nghiệm trong lĩnh vực phát triển web, tôi luôn tìm tòi và học hỏi những công nghệ mới nhất.',
	kyNang: ['React', 'TypeScript', 'Node.js', 'Ant Design', 'UmiJS', 'PostgreSQL', 'Docker', 'Git'],
	lienKet: {
		github: 'https://github.com',
		facebook: 'https://facebook.com',
		linkedin: 'https://linkedin.com',
		email: 'contact@blog.com',
	},
};

export const DS_THE_BAN_DAU: IThe[] = [
	{ id: 'the-001', tenThe: 'React' },
	{ id: 'the-002', tenThe: 'TypeScript' },
	{ id: 'the-003', tenThe: 'JavaScript' },
	{ id: 'the-004', tenThe: 'CSS' },
	{ id: 'the-005', tenThe: 'Node.js' },
	{ id: 'the-006', tenThe: 'UmiJS' },
	{ id: 'the-007', tenThe: 'Ant Design' },
	{ id: 'the-008', tenThe: 'Docker' },
	{ id: 'the-009', tenThe: 'Git' },
	{ id: 'the-010', tenThe: 'Database' },
];

export const DS_BAI_VIET_BAN_DAU: IBaiViet[] = [
	{
		id: 'bv-001',
		tieuDe: 'Bắt đầu với React và TypeScript',
		slug: 'bat-dau-voi-react-va-typescript',
		tomTat: 'Hướng dẫn bạn từng bước xây dựng ứng dụng React đầu tiên với TypeScript, từ cài đặt đến triển khai component cơ bản.',
		noiDung: `# Bắt đầu với React và TypeScript

## Giới thiệu

React kết hợp với TypeScript mang lại trải nghiệm phát triển tuyệt vời. TypeScript giúp phát hiện lỗi sớm, cung cấp IntelliSense tốt hơn và làm cho code dễ bảo trì hơn.

## Cài đặt môi trường

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Tạo Component đầu tiên

\`\`\`tsx
interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      {age && <p>Tuổi: {age}</p>}
    </div>
  );
};
\`\`\`

## Quản lý State với TypeScript

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

## Kết luận

React + TypeScript là sự kết hợp hoàn hảo cho các dự án lớn. Hãy bắt đầu ngay từ dự án nhỏ để làm quen!`,
		anhDaiDien: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-01',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-001', 'the-002'],
		luotXem: 156,
	},
	{
		id: 'bv-002',
		tieuDe: 'Tìm hiểu UmiJS - Framework React mạnh mẽ',
		slug: 'tim-hieu-umijs-framework-react-manh-me',
		tomTat: 'Khám phá UmiJS, một framework doanh nghiệp dựa trên React với routing, plugins, và nhiều tính năng out-of-the-box.',
		noiDung: `# Tìm hiểu UmiJS - Framework React mạnh mẽ

## UmiJS là gì?

UmiJS là một framework React cấp doanh nghiệp với nhiều tính năng tích hợp sẵn:
- **Routing tự động** dựa trên cấu trúc thư mục
- **Plugin system** mở rộng linh hoạt
- **Hỗ trợ TypeScript** hoàn chỉnh

## Cấu trúc dự án

\`\`\`
src/
├── pages/
│   ├── index.tsx
│   └── about.tsx
├── models/
│   └── user.ts
├── services/
│   └── api.ts
└── app.tsx
\`\`\`

## Cấu hình Routes

\`\`\`ts
export default [
  { path: '/', component: './Home' },
  { path: '/about', component: './About' },
];
\`\`\`

## Kết luận

UmiJS là lựa chọn tuyệt vời cho các dự án React quy mô lớn nhờ kiến trúc rõ ràng và hệ sinh thái phong phú.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-05',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-001', 'the-006'],
		luotXem: 98,
	},
	{
		id: 'bv-003',
		tieuDe: 'Ant Design - Thư viện UI cho React',
		slug: 'ant-design-thu-vien-ui-cho-react',
		tomTat: 'Giới thiệu Ant Design, một thư viện component UI chất lượng cao và cách sử dụng các component phổ biến.',
		noiDung: `# Ant Design - Thư viện UI cho React

## Tại sao chọn Ant Design?

Ant Design cung cấp hơn 60+ component chất lượng cao, thiết kế đồng nhất, hỗ trợ i18n, và theme customization.

## Cài đặt

\`\`\`bash
npm install antd @ant-design/icons
\`\`\`

## Ví dụ sử dụng Table

\`\`\`tsx
import { Table, Tag } from 'antd';

const columns = [
  { title: 'Tên', dataIndex: 'name' },
  { title: 'Tuổi', dataIndex: 'age' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (val) => <Tag color="green">{val}</Tag>
  },
];
\`\`\`

## Kết luận

Ant Design giúp tăng tốc phát triển UI đáng kể với các component sẵn có và thiết kế chuyên nghiệp.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-08',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-001', 'the-007'],
		luotXem: 210,
	},
	{
		id: 'bv-004',
		tieuDe: 'Docker cơ bản cho lập trình viên',
		slug: 'docker-co-ban-cho-lap-trinh-vien',
		tomTat: 'Tìm hiểu Docker từ cơ bản: container, image, Dockerfile, và docker-compose để triển khai ứng dụng dễ dàng.',
		noiDung: `# Docker cơ bản cho lập trình viên

## Docker là gì?

Docker là nền tảng containerization cho phép đóng gói ứng dụng cùng dependencies vào container, đảm bảo chạy nhất quán trên mọi môi trường.

## Các khái niệm cơ bản

- **Image**: Template chứa ứng dụng và dependencies
- **Container**: Instance đang chạy của image
- **Dockerfile**: File cấu hình để build image

## Dockerfile mẫu

\`\`\`dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Kết luận

Docker giúp đơn giản hóa quá trình triển khai và đảm bảo tính nhất quán giữa các môi trường development, staging, và production.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-10',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-008'],
		luotXem: 87,
	},
	{
		id: 'bv-005',
		tieuDe: 'CSS Grid và Flexbox - Hướng dẫn toàn diện',
		slug: 'css-grid-va-flexbox-huong-dan-toan-dien',
		tomTat: 'So sánh CSS Grid vs Flexbox, khi nào dùng cái nào, và ví dụ thực tế để layout responsive hoàn hảo.',
		noiDung: `# CSS Grid và Flexbox - Hướng dẫn toàn diện

## Flexbox vs Grid

| Đặc điểm | Flexbox | Grid |
|-----------|---------|------|
| Chiều | 1 chiều | 2 chiều |
| Sử dụng | Components nhỏ | Layout tổng thể |

## Flexbox cơ bản

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## Grid cơ bản

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Kết luận

Flexbox và Grid bổ sung cho nhau. Sử dụng Flexbox cho layout 1 chiều và Grid cho layout 2 chiều phức tạp.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-12',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-004'],
		luotXem: 143,
	},
	{
		id: 'bv-006',
		tieuDe: 'Node.js và Express API cơ bản',
		slug: 'nodejs-va-express-api-co-ban',
		tomTat: 'Xây dựng RESTful API đơn giản với Node.js và Express, bao gồm CRUD operations và middleware.',
		noiDung: `# Node.js và Express API cơ bản

## Server cơ bản

\`\`\`ts
import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server đang chạy tại port 3000');
});
\`\`\`

## Middleware

\`\`\`ts
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
};
app.use(logger);
\`\`\`

## Kết luận

Express là framework nhẹ nhàng và linh hoạt, phù hợp cho cả API nhỏ lẫn ứng dụng lớn.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-13',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-005', 'the-002'],
		luotXem: 65,
	},
	{
		id: 'bv-007',
		tieuDe: 'Quản lý phiên bản code với Git',
		slug: 'quan-ly-phien-ban-code-voi-git',
		tomTat: 'Tổng hợp các lệnh Git quan trọng, workflow phổ biến, và mẹo xử lý conflict hiệu quả.',
		noiDung: `# Quản lý phiên bản code với Git

## Các lệnh cơ bản

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

## Branching

\`\`\`bash
git checkout -b feature/new-feature
git merge feature/new-feature
git branch -d feature/new-feature
\`\`\`

## Git Flow

- **main**: code production
- **develop**: code development
- **feature/**: tính năng mới
- **hotfix/**: fix bug khẩn cấp

## Kết luận

Git là công cụ không thể thiếu. Nắm vững Git giúp bạn làm việc hiệu quả hơn trong team.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-14',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-009'],
		luotXem: 112,
	},
	{
		id: 'bv-008',
		tieuDe: 'JavaScript ES6+ - Tính năng hay nhất',
		slug: 'javascript-es6-tinh-nang-hay-nhat',
		tomTat: 'Tổng hợp các tính năng mới và hữu ích từ ES6 trở đi: arrow functions, destructuring, async/await.',
		noiDung: `# JavaScript ES6+ - Tính năng hay nhất

## Arrow Functions

\`\`\`js
const add = (a, b) => a + b;
const greet = name => \`Hello \${name}\`;
\`\`\`

## Destructuring

\`\`\`js
const { name, age } = user;
const [first, ...rest] = array;
\`\`\`

## Async/Await

\`\`\`js
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Kết luận

Nắm vững ES6+ giúp viết code JavaScript sạch hơn, ngắn gọn hơn, và dễ đọc hơn.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-15',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-003'],
		luotXem: 189,
	},
	{
		id: 'bv-009',
		tieuDe: 'PostgreSQL cơ bản cho Developer',
		slug: 'postgresql-co-ban-cho-developer',
		tomTat: 'Hướng dẫn sử dụng PostgreSQL: cài đặt, tạo database, query cơ bản và tối ưu hiệu suất.',
		noiDung: `# PostgreSQL cơ bản cho Developer

## Tạo Database và Table

\`\`\`sql
CREATE DATABASE blog;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Query cơ bản

\`\`\`sql
SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC;
INSERT INTO posts (title, content) VALUES ('Hello', 'World');
UPDATE posts SET title = 'Updated' WHERE id = 1;
DELETE FROM posts WHERE id = 1;
\`\`\`

## Kết luận

PostgreSQL là RDBMS mạnh mẽ, mã nguồn mở, phù hợp cho mọi quy mô dự án.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-16',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-010'],
		luotXem: 76,
	},
	{
		id: 'bv-010',
		tieuDe: 'Xây dựng ứng dụng Full-stack với React và Node.js',
		slug: 'xay-dung-ung-dung-fullstack-react-nodejs',
		tomTat: 'Hướng dẫn kết hợp React frontend với Node.js backend, kết nối database, và deploy lên cloud.',
		noiDung: `# Xây dựng ứng dụng Full-stack với React và Node.js

## Kiến trúc tổng quan

- **Frontend**: React + TypeScript + Ant Design
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Deploy**: Docker + Cloud

## Kết nối API

\`\`\`tsx
const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  const data = await response.json();
  setPosts(data);
};
\`\`\`

## Kết luận

Full-stack development với React và Node.js là combo phổ biến, hiệu quả cho các dự án web hiện đại.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-18',
		trangThai: ETrangThai.DaDang,
		dsTheId: ['the-001', 'the-002', 'the-005', 'the-010'],
		luotXem: 234,
	},
	{
		id: 'bv-011',
		tieuDe: 'React Hooks nâng cao: useCallback và useMemo',
		slug: 'react-hooks-nang-cao-usecallback-usememo',
		tomTat: 'Tìm hiểu cách sử dụng useCallback và useMemo để tối ưu hiệu suất ứng dụng React.',
		noiDung: `# React Hooks nâng cao: useCallback và useMemo

## useMemo

\`\`\`tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
\`\`\`

## useCallback

\`\`\`tsx
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);
\`\`\`

## Khi nào nên dùng?

- **useMemo**: Tính toán phức tạp, dữ liệu lớn
- **useCallback**: Truyền hàm vào child component

## Kết luận

Không lạm dụng, chỉ dùng khi thực sự cần tối ưu.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-19',
		trangThai: ETrangThai.BanNhap,
		dsTheId: ['the-001', 'the-003'],
		luotXem: 0,
	},
	{
		id: 'bv-012',
		tieuDe: 'TypeScript Generics từ A đến Z',
		slug: 'typescript-generics-tu-a-den-z',
		tomTat: 'Hiểu rõ về Generics trong TypeScript, cách viết hàm, interface và class với generic type parameters.',
		noiDung: `# TypeScript Generics từ A đến Z

## Hàm Generic

\`\`\`ts
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>("hello");
\`\`\`

## Interface Generic

\`\`\`ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
\`\`\`

## Constraints

\`\`\`ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Kết luận

Generics là tính năng mạnh nhất của TypeScript, giúp viết code linh hoạt mà vẫn an toàn kiểu.`,
		anhDaiDien: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop',
		tacGia: 'Nguyễn Lê Anh',
		ngayDang: '2026-04-20',
		trangThai: ETrangThai.BanNhap,
		dsTheId: ['the-002'],
		luotXem: 0,
	},
];
