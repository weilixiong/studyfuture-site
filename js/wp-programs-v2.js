/**
 * WordPress 热门项目动态加载
 * 从 WordPress API 获取"热门项目"分类的文章并渲染
 */

// 直接加载本地缓存 JSON（服务器端预获取，不需要跨域代理）
const WP_API_CACHE = '/js/cached-posts.json?v=20260528';

// 从文章内容提取关键信息
function extractProgramInfo(post) {
    // 确保 content 和 excerpt 是字符串
    const content = typeof post.content === 'string' ? post.content : '';
    const excerpt = typeof post.excerpt === 'string' ? post.excerpt : '';
    
    // 提取学校名称（从标题或内容）
    const schoolMatch = content.match(/([\u4e00-\u9fa5]+大学|[\u4e00-\u9fa5]+学院)/);
    const school = schoolMatch && schoolMatch[1] ? schoolMatch[1] : '国际知名院校';
    
    // 提取学制
    const durationMatch = content.match(/(\d+[\-~]?\d*\s*(个月|年|月))|(\d+\s*(month|year)s?)/i);
    const duration = durationMatch ? (durationMatch[1] || durationMatch[0]) : '1-2年';
    
    // 提取授课语言
    const langMatch = content.match(/(中文|英文|英语|双语|中\/英文|中\/英)/);
    const language = langMatch && langMatch[1] ? langMatch[1] + '授课' : '英文授课';
    
    // 提取标签作为特性
    const tags = Object.keys(post.tags || {}).slice(0, 4);
    
    // 提取特色图片或使用默认
    const image = typeof post.featured_image === 'string' && post.featured_image ? post.featured_image : 'https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_14863a36-4f35-456f-8ddc-83afe0cc7b5b.jpg';
    
    // 生成徽章
    const badges = ['热门', '推荐', '精选', '认证'];
    const badge = badges[post.ID % badges.length];
    
    return {
        id: post.ID,
        title: post.title,
        school: school,
        duration: duration,
        language: language,
        excerpt: (excerpt || content).replace(/<[^>]+>/g, '').substring(0, 100) + '...',
        image: image,
        badge: badge,
        tags: tags,
        url: post.URL,
        date: post.date
    };
}

// 创建项目卡片 HTML
function createProgramCard(program) {
    return `
    <div class="rounded-xl border bg-card text-card-foreground overflow-hidden border-none shadow-sm group hover:shadow-lg transition-all duration-300 flex flex-col h-full motion-safe" data-program-id="${program.id}">
        <div class="relative aspect-video overflow-hidden">
            <img src="${program.image}" alt="${program.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 motion-safe">
            <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 absolute top-4 left-4 bg-brand-gold text-primary font-bold border-none">${program.badge}</div>
        </div>
        <div class="p-6 flex-grow">
            <div class="flex items-center gap-2 text-brand-gold text-sm font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap w-4 h-4" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                ${program.school}
            </div>
            <h4 class="text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight">${program.title}</h4>
            <p class="text-muted-foreground text-sm mb-4 line-clamp-2">${program.excerpt}</p>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2 text-muted-foreground text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-4 h-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    ${program.duration}
                </div>
                <div class="flex items-center gap-2 text-muted-foreground text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                    ${program.language}
                </div>
            </div>
            ${program.tags.length > 0 ? `
            <div class="flex gap-2 mt-3">
                ${program.tags.map(tag => `<span class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">${tag}</span>`).join('')}
            </div>
            ` : ''}
        </div>
        <div class="flex items-center p-6 pt-0">
            <a href="https://blog.clawone.site/?p=${program.id}" target="_blank" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full bg-primary text-white hover:bg-primary/90">了解更多</a>
        </div>
    </div>
    `;
}

// 加载热门项目
async function loadPrograms() {
    const container = document.getElementById('programs-grid');
    if (!container) return;
    
    try {
        // 显示加载状态
        container.innerHTML = '<div class="col-span-full text-center py-12"><div class="inline-block rounded-full h-8 w-8 border-2 border-brand-gold/30 border-t-brand-gold animate-spin"></div><p class="text-muted-foreground mt-4">加载项目中...</p></div>';
        
        // 直接加载本地缓存 JSON（预获取在服务器端，不需要跨域）
        const response = await fetch(WP_API_CACHE);
        
        if (!response.ok) {
            throw new Error('Failed to fetch programs');
        }
        
        const data = await response.json();
        const posts = data.posts || [];
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12 text-muted-foreground">暂无项目，请稍后查看</div>';
            return;
        }
        
        // 渲染项目卡片（添加 try-catch 保护，跳过失败的文章）
        const programs = posts.map(post => {
          try {
            return extractProgramInfo(post);
          } catch (e) {
            console.error('Failed to extract program info for post ' + post.ID + ':', e);
            return null;
          }
        }).filter(p => p !== null);
        container.innerHTML = programs.map(createProgramCard).join('');
        
    } catch (error) {
        console.error('Error loading programs:', error);
        container.innerHTML = '<div class="col-span-full text-center py-12 text-muted-foreground">加载失败，请刷新页面重试<br><small>' + error + '</small></div>';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadPrograms);
