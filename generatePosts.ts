import fs from 'fs';

const topics = [
  "Niềng Răng Mắc Cài Kim Loại", "Niềng Răng Trong Suốt Invisalign", "Vệ Sinh Răng Miệng Khi Niềng",
  "Chế Độ Ăn Cho Người Niềng Răng", "Xử Lý Rắc Rối Khi Niềng Răng", "Hàm Duy Trì Sau Niềng",
  "Sử Dụng Chỉ Nha Khoa & Bàn Chải Kẽ", "Kem Đánh Răng Cho Người Niềng"
];

const adjectives = ["Hiệu Quả", "An Toàn", "Tiết Kiệm", "Nhanh Chóng", "Không Đau", "Đúng Cách", "Toàn Tập", "Chi Tiết"];
const actions = ["Hướng Dẫn", "Bí Quyết", "Mẹo Hay", "Lưu Ý Quan Trọng", "Giải Pháp", "Kinh Nghiệm", "Cẩm Nang", "Góc Nhìn"];

let posts = [];

posts.push({
  id: "bi-quyet-nieng-rang",
  title: 'Bí Quyết Niềng Răng Không Lo Sâu Răng: Hướng Dẫn Toàn Tập',
  category: 'Niềng Răng',
  image: 'https://images.unsplash.com/photo-1598256989476-b631d8c1c4f5?auto=format&fit=crop&q=80&w=600',
  date: '10 Thg 5, 2026',
  excerpt: 'Hành trình chỉnh nha đòi hỏi sự kiên nhẫn và chăm sóc đúng cách. Khám phá bí quyết loại bỏ thức ăn thừa và bảo vệ men răng tại nhà hiệu quả nhất.',
  content: 'Niềng răng là một khoản đầu tư lớn cho tương lai với mong muốn có một nụ cười đẹp và hàm răng khỏe mạnh. Tuy nhiên, nếu không vệ sinh đúng cách, sâu răng và viêm nướu có thể phá hỏng tất cả. Chọn kem đánh răng chuyên dụng, sử dụng bàn chải kẽ và nước súc miệng là các bước không thể bỏ qua.\\n\\n**Làm thế nào để chọn đúng?**\\nHãy chú ý đến thành phần Fluoride và các chất kháng khuẩn để bảo vệ toàn diện nha.'
});
posts.push({
  id: "tieu-chi-chon-kem-danh-rang",
  title: 'Tiêu Chí Chọn Kem Đánh Răng Cho Người Niềng Răng Chuẩn Y Khoa',
  category: 'Chăm Sóc Hàng Ngày',
  image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600',
  date: '05 Thg 5, 2026',
  excerpt: 'Không phải loại kem nào cũng phù hợp khi mang mắc cài. Cùng tìm hiểu tại sao bạn cần sử dụng loại kem chuyên dụng để ngăn ngừa vệt trắng.',
  content: 'Các loại kem đánh răng thông thường có thể chứa các hạt mài mòn quá lớn gây xước men răng, hoặc thiếu fluoride cần thiết. Người niềng răng nên chọn kem có chứa CPC, Fluoride ở mức độ phù hợp và an toàn cho nướu nhạy cảm.\\n\\n**Tại sao chọn FURANO?**\\nSản phẩm dược mỹ phẩm của FURANO được thiết kế riêng với nồng độ an toàn, bọt mịn làm sạch rãnh mắc cài và không gây tổn thương mô.'
});
posts.push({
  id: "vien-sui-ve-sinh-khay",
  title: 'Viên Sủi Vệ Sinh Khay Duy Trì: Bí Quyết Kéo Dài Tuổi Thọ Khay',
  category: 'Invisalign & Khay Trong',
  image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600',
  date: '28 Thg 4, 2026',
  excerpt: 'Tìm hiểu tầm quan trọng của việc vệ sinh khay Invisalign, retainer hàng ngày bằng viên sủi siêu sạch, ngăn chặn vi khuẩn và ố vàng.',
  content: 'Khay niềng trong suốt rất dễ bị ố vàng và tích tụ vi khuẩn nếu chỉ rửa bằng nước. Sử dụng viên sủi vệ sinh chuyên dụng giúp diệt sạch 99.9% vi khuẩn, giữ khay luôn trong suốt và không gây hôi miệng.\\n\\n**Hướng dẫn sử dụng:**\\n1. Chuẩn bị 1 ly nước ấm.\\n2. Bỏ khay niềng và 1 viên sủi vào.\\n3. Ngâm 15 phút, sau đó xả sạch.'
});
posts.push({
  id: "vien-sui-ve-sinh-mac-cai",
  title: 'Viên Sủi Vệ Sinh Mắc Cài: Giải Pháp Sạch Sâu 99% Mảng Bám',
  category: 'Giải Pháp Chuyên Sâu',
  image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
  date: '20 Thg 4, 2026',
  excerpt: 'Vệ sinh mắc cài là bước cực kỳ quan trọng. Khám phá cách sử dụng bọt khí O2 tác động sâu và an toàn cho mọi chất liệu mắc cài.',
  content: 'Đối với những mảng bám cứng đầu tại các kẽ mắc cài mà bàn chải không thể chạm tới, viên sủi vệ sinh mắc cài là giải pháp đột phá. Bọt khí O2 sẽ đi sâu vào từng kẽ nhỏ để đánh bật mảng bám.'
});

const generateSlug = (str: string) => {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, '-');
}

let images = [
    'https://images.unsplash.com/photo-1598256989476-b631d8c1c4f5?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
];

for(let i = 5; i <= 200; i++) {
   const topic = topics[i % topics.length];
   const action = actions[i % actions.length];
   const adj = adjectives[i % adjectives.length];
   
   const title = `${action} Về ${topic} ${adj} Nhất Mà Bạn Cần Biết (Phần ${Math.floor(i/10) + 1})`;
   const category = topic;
   const image = images[i % images.length];
   
   const month = Math.floor(Math.random() * 12) + 1;
   const day = Math.floor(Math.random() * 28) + 1;
   const year = 2025 + Math.floor(Math.random() * 2);
   const dateStr = `${day.toString().padStart(2, '0')} Thg ${month}, ${year}`;
   
   const excerpt = `Trong bài viết này, chúng tôi sẽ chia sẻ những ${action.toLowerCase()} hữu ích nhất xoay quanh vấn đề ${topic.toLowerCase()}. Cùng tìm hiểu cách thức thực hiện ${adj.toLowerCase()} để đảm bảo sức khỏe răng miệng trong suốt quá trình chỉnh nha.`;
   
   const content = `Khi bắt đầu với quá trình ${topic.toLowerCase()}, nhiều người thường cảm thấy bỡ ngỡ và lo lắng. ${action} này được thiết kế để giải đáp mọi thắc mắc của bạn về vấn đề này. \n\n## Tại sao bạn cần quan tâm?\nViệc trang bị kiến thức ${adj.toLowerCase()} sẽ giúp bạn trải qua quá trình niềng răng một cách thoải mái nhất. Sự kiên nhẫn và tuân thủ các quy tắc vệ sinh là chìa khóa thành công.\n\n## Các bước thực hiện\n1. Luôn sử dụng các sản phẩm hỗ trợ chuyên dụng.\n2. Thăm khám định kỳ theo lịch hẹn của bác sĩ.\n3. Chú ý chế độ ăn uống hàng ngày.\n4. Vệ sinh cẩn thận sau mỗi bữa ăn.\n\nHãy tiếp tục theo dõi để không bỏ lỡ những thông tin bổ ích khác về hành trình kiến tạo nụ cười của bạn!`;

   posts.push({
      id: generateSlug(title) + `-${i}`,
      title: title,
      category: category,
      image: image,
      date: dateStr,
      excerpt: excerpt,
      content: content
   });
}

const fileContent = `export interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n`;
fs.writeFileSync('src/data/blogPosts.ts', fileContent);
console.log('Successfully generated 200 blog posts');
