export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'company' | 'market' | 'logistics';
  categoryLabel: string;
  publishedAt: string;
  readTime: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
}

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'Xu hướng vận tải vật liệu xây dựng năm 2025: Những thay đổi lớn',
    slug: 'xu-huong-van-tai-vlxd-2025',
    excerpt:
      'Ngành vận tải vật liệu xây dựng đang chứng kiến những thay đổi mạnh mẽ từ công nghệ và nhu cầu thị trường. Tìm hiểu những xu hướng chính định hình năm 2025.',
    content: `Ngành vận tải vật liệu xây dựng (VLXD) tại Việt Nam đang trải qua giai đoạn chuyển đổi quan trọng...`,
    category: 'market',
    categoryLabel: 'Tin thị trường',
    publishedAt: '2025-03-15',
    readTime: '5 phút đọc',
  },
  {
    id: '2',
    title: 'Benhub mở rộng hoạt động ra 20 tỉnh thành mới trong Q1/2025',
    slug: 'benhub-mo-rong-20-tinh-thanh-q1-2025',
    excerpt:
      'Sau thành công tại thị trường Hà Nội và các tỉnh lân cận, Benhub chính thức phủ sóng thêm 20 tỉnh thành, nâng tổng số lên 50+ tỉnh thành trên cả nước.',
    content: `Với định hướng trở thành nền tảng vận chuyển VLXD B2B hàng đầu cả nước...`,
    category: 'company',
    categoryLabel: 'Tin công ty',
    publishedAt: '2025-02-20',
    readTime: '4 phút đọc',
  },
  {
    id: '3',
    title: 'Tối ưu chi phí giao nhận cho đại lý vật liệu xây dựng',
    slug: 'toi-uu-chi-phi-giao-nhan-dai-ly-vlxd',
    excerpt:
      'Chiến lược và giải pháp giúp các đại lý VLXD cắt giảm chi phí logistics từ 20-35% trong khi vẫn đảm bảo chất lượng dịch vụ giao nhận.',
    content: `Logistics là một trong những chi phí lớn nhất đối với các đại lý vật liệu xây dựng...`,
    category: 'logistics',
    categoryLabel: 'Logistics',
    publishedAt: '2025-01-30',
    readTime: '7 phút đọc',
  },
  {
    id: '4',
    title: 'Công nghệ GPS và hành trình số hóa vận tải VLXD tại Việt Nam',
    slug: 'cong-nghe-gps-so-hoa-van-tai-vlxd',
    excerpt:
      'GPS tracking và các giải pháp công nghệ đang cách mạng hóa ngành vận tải vật liệu xây dựng, mang lại minh bạch và hiệu quả chưa từng có.',
    content: `Sự bùng nổ của công nghệ GPS và IoT đang thay đổi hoàn toàn cách thức vận hành...`,
    category: 'logistics',
    categoryLabel: 'Logistics',
    publishedAt: '2025-01-10',
    readTime: '6 phút đọc',
  },
  {
    id: '5',
    title: 'Benhub nhận giải thưởng "Nền tảng Logistics B2B tiêu biểu 2024"',
    slug: 'benhub-giai-thuong-logistics-b2b-2024',
    excerpt:
      'Benhub vinh dự được Hiệp hội Logistics Việt Nam trao tặng giải thưởng nền tảng Logistics B2B tiêu biểu năm 2024, ghi nhận những đóng góp cho ngành.',
    content: `Đây là sự ghi nhận xứng đáng cho những nỗ lực không ngừng của đội ngũ Benhub...`,
    category: 'company',
    categoryLabel: 'Tin công ty',
    publishedAt: '2024-12-20',
    readTime: '3 phút đọc',
  },
  {
    id: '6',
    title: 'Báo cáo thị trường VLXD Việt Nam: Cơ hội và thách thức 2025',
    slug: 'bao-cao-thi-truong-vlxd-viet-nam-2025',
    excerpt:
      'Thị trường vật liệu xây dựng Việt Nam dự kiến tăng trưởng 12-15% trong năm 2025, được thúc đẩy bởi các dự án hạ tầng lớn và sự phục hồi bất động sản.',
    content: `Báo cáo thị trường mới nhất cho thấy ngành VLXD Việt Nam đang trong giai đoạn tăng trưởng mạnh...`,
    category: 'market',
    categoryLabel: 'Tin thị trường',
    publishedAt: '2024-12-05',
    readTime: '8 phút đọc',
  },
];

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Sales B2B – Phát triển Khách hàng Doanh nghiệp',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: 'Thỏa thuận',
    description:
      'Chúng tôi tìm kiếm Sales B2B năng động, có kinh nghiệm phát triển khách hàng doanh nghiệp trong ngành xây dựng, vật liệu xây dựng hoặc logistics.',
    requirements: [
      'Tốt nghiệp ĐH chuyên ngành Kinh tế, Quản trị Kinh doanh hoặc liên quan',
      'Tối thiểu 2 năm kinh nghiệm Sales B2B',
      'Có mạng lưới quan hệ trong ngành xây dựng/VLXD là lợi thế',
      'Kỹ năng giao tiếp, đàm phán và thuyết trình tốt',
      'Sẵn sàng đi công tác theo yêu cầu',
    ],
    benefits: [
      'Lương cơ bản + hoa hồng hấp dẫn, không giới hạn thu nhập',
      'BHXH, BHYT, BHTN đầy đủ',
      'Laptop, điện thoại, phụ cấp đi lại',
      'Đào tạo sản phẩm và kỹ năng bán hàng bài bản',
      'Môi trường startup năng động, cơ hội thăng tiến nhanh',
    ],
    isActive: true,
  },
  {
    id: '2',
    title: 'Điều phối Vận hành – Operations Coordinator',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: '8 – 12 triệu',
    description:
      'Điều phối và giám sát hoạt động vận chuyển hàng ngày, đảm bảo đơn hàng được xử lý đúng tiến độ và khách hàng hài lòng.',
    requirements: [
      'Tốt nghiệp ĐH chuyên ngành Logistics, Quản trị hoặc tương đương',
      'Kỹ năng tổ chức và xử lý đa nhiệm tốt',
      'Sử dụng thành thạo Excel và các phần mềm quản lý',
      'Chịu được áp lực cao, làm việc theo ca khi cần',
      'Ưu tiên có kinh nghiệm trong ngành logistics/vận tải',
    ],
    benefits: [
      'Lương cố định 8-12 triệu + thưởng hiệu suất',
      'Làm việc giờ hành chính, ca linh hoạt',
      'BHXH đầy đủ, nghỉ phép 12 ngày/năm',
      'Team building, du lịch hàng năm',
      'Cơ hội phát triển lên Team Lead sau 1 năm',
    ],
    isActive: true,
  },
  {
    id: '3',
    title: 'Operations Specialist – Chuyên viên Vận hành',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: '10 – 15 triệu',
    description:
      'Phân tích dữ liệu vận hành, tối ưu quy trình và phối hợp với các phòng ban để nâng cao hiệu quả hoạt động của nền tảng.',
    requirements: [
      'Tốt nghiệp ĐH Kinh tế, Kỹ thuật hoặc tương đương',
      'Tư duy phân tích dữ liệu, biết sử dụng SQL hoặc Python là lợi thế',
      'Kỹ năng viết báo cáo và trình bày rõ ràng',
      'Kinh nghiệm làm việc trong môi trường startup là lợi thế',
      'Tư duy cải tiến quy trình (Lean/Agile)',
    ],
    benefits: [
      'Mức lương cạnh tranh 10-15 triệu',
      'Cổ phần ESOP cho nhân sự xuất sắc',
      'Được làm việc với team kỹ thuật và product',
      'Đào tạo và phát triển chuyên môn',
      'Phúc lợi đầy đủ theo quy định pháp luật',
    ],
    isActive: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Minh',
    role: 'Giám đốc',
    company: 'Đại lý VLXD Phú Thọ',
    content:
      'Từ khi hợp tác với Benhub, chúng tôi giảm được 30% chi phí vận chuyển và không còn lo lắng về việc giao hàng trễ tiến độ. Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Trần Thị Lan',
    role: 'Trưởng phòng Mua hàng',
    company: 'Công ty Xây dựng ABC',
    content:
      'Benhub đã giải quyết bài toán logistics phức tạp của chúng tôi. Xe đa dạng từ 500kg đến 15 tấn, đặt xe nhanh, theo dõi được hành trình thực tế. Rất tin tưởng!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Lê Văn Đức',
    role: 'Chủ cơ sở',
    company: 'Cơ sở Gạch Đức Phát',
    content:
      'Giao hàng đúng giờ, tài xế có kinh nghiệm bốc xếp vật liệu nặng, giá cả minh bạch không phát sinh. Đây là đối tác logistics tốt nhất tôi từng làm việc.',
    rating: 5,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    client: 'Tập đoàn Xây dựng Hoàng Long',
    industry: 'Xây dựng dân dụng',
    problem:
      'Quản lý 50+ công trình đồng thời, cần giao VLXD đúng tiến độ mà chi phí logistics vượt ngân sách 40%.',
    solution:
      'Triển khai giải pháp điều phối xe tập trung với fleet 20 xe tải, tích hợp GPS tracking, lên lịch giao hàng tự động.',
    results: [
      'Giảm 35% chi phí logistics',
      'Tỷ lệ giao đúng hạn đạt 98.5%',
      '100% công trình được phủ trong bán kính 100km',
    ],
  },
  {
    id: '2',
    client: 'Hệ thống Đại lý VLXD Miền Bắc',
    industry: 'Phân phối vật liệu',
    problem:
      'Mạng lưới 30 đại lý cần giao hàng linh hoạt, khó kiểm soát chất lượng và chi phí từ nhiều nhà vận tải khác nhau.',
    solution:
      'Tập trung hóa đặt xe qua nền tảng Benhub, chuẩn hóa quy trình bốc xếp, báo cáo tự động theo tuần.',
    results: [
      'Giảm 28% chi phí vận chuyển',
      'Tiết kiệm 15 giờ/tuần cho admin',
      'Khách hàng cuối hài lòng tăng 25%',
    ],
  },
  {
    id: '3',
    client: 'Công ty CP Nhà ở Xanh',
    industry: 'Bất động sản',
    problem:
      'Dự án cao tầng cần giao vật liệu ca đêm để không ảnh hưởng giao thông, giá tạm thời và khó quản lý.',
    solution:
      'Dịch vụ giao hàng ngoài giờ chuyên biệt 22:00–06:00, tài xế được đào tạo về an toàn giao thông nội đô.',
    results: [
      'Hoàn thành 100% ca giao đêm đúng lịch',
      'Phụ thu ca đêm minh bạch, cố định 20%',
      'Không phát sinh vi phạm giao thông nào',
    ],
  },
];

export const STATS = [
  { value: 500, suffix: '+', label: 'Khách hàng B2B' },
  { value: 50, suffix: '+', label: 'Đối tác tài xế' },
  { value: 10000, suffix: '+', label: 'Chuyến/tháng' },
  { value: 98, suffix: '%', label: 'Tỷ lệ đúng hạn' },
];

export const SERVICES = [
  {
    id: '1',
    icon: 'Package',
    title: 'Giao hàng VLXD',
    short: 'Xi măng, sắt thép, gạch, cát đá – giao tận công trình',
    description:
      'Chuyên giao nhận các loại vật liệu xây dựng từ đại lý đến công trình. Đảm bảo hàng nguyên vẹn, đúng số lượng, đúng thời gian cam kết.',
    specs: {
      area: 'Nội thành 4h, ngoại thành 24h',
      vehicle: 'Xe tải 500kg – 15 tấn',
      capacity: 'Tải trọng đa dạng theo yêu cầu',
      sla: '98% đúng hạn cam kết',
    },
  },
  {
    id: '2',
    icon: 'Truck',
    title: 'Điều phối xe tải',
    short: 'Fleet 500kg → 15 tấn, xe bạt/kín, GPS realtime',
    description:
      'Fleet xe tải đa dạng, luôn sẵn sàng 24/7 với GPS tracking thời gian thực. Tài xế được đào tạo bài bản về an toàn và kỹ năng bốc xếp vật liệu.',
    specs: {
      area: 'Phủ 50+ tỉnh thành toàn quốc',
      vehicle: 'Xe bạt, xe kín, xe chuyên dụng',
      capacity: '500kg, 1T, 2.5T, 5T, 10T, 15T',
      sla: 'Điều phối trong 30 phút',
    },
  },
  {
    id: '3',
    icon: 'Users',
    title: 'Dịch vụ bốc xếp',
    short: 'Đội bốc xếp chuyên nghiệp, bảo hiểm hàng hoá',
    description:
      'Đội ngũ bốc xếp được đào tạo chuyên nghiệp, có kinh nghiệm với các loại vật liệu nặng. Tất cả hàng hóa được bảo hiểm trong suốt quá trình vận chuyển.',
    specs: {
      area: 'Hà Nội và các tỉnh lân cận',
      vehicle: 'Hỗ trợ xe cẩu mini khi cần',
      capacity: 'Không giới hạn tải trọng',
      sla: 'Phụ phí minh bạch, cố định',
    },
  },
  {
    id: '4',
    icon: 'Moon',
    title: 'Giao ngoài giờ',
    short: 'Ca đêm & cuối tuần theo tiến độ công trình',
    description:
      'Dịch vụ giao hàng ca đêm 22:00–06:00 và cuối tuần/ngày lễ, phục vụ các công trình cần giao hàng ngoài giờ cao điểm để tránh tắc đường.',
    specs: {
      area: 'Nội thành ưu tiên, ngoại thành theo yêu cầu',
      vehicle: 'Xe được phép lưu thông ca đêm',
      capacity: 'Áp dụng mọi tải trọng',
      sla: 'Phụ thu ca đêm cố định 20%',
    },
  },
];

export const CLIENT_LOGOS = [
  'Tập đoàn Hòa Bình',
  'Xây dựng Delta',
  'VLXD Phú Thọ',
  'Coteccons',
  'Ricons Group',
  'Xây dựng ABC',
  'Đại lý Hoàng Gia',
  'Tân Long Group',
];
