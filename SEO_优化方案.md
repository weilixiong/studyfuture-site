# clawone.site SEO 优化方案

> 2026-05-23 · 铁娃出品

---

## 一、当前现状诊断

### ✅ 已有
- 单页面（index.html），含 4 个核心 section
- 有 title / meta description
- 已部署 GitHub Pages + Cloudflare CDN
- 有 Google Analytics / Search Console（需确认）

### ❌ 缺少/严重问题

| 问题 | 影响程度 | 说明 |
|------|---------|------|
| **单页面结构** | 🔴 致命 | 所有内容挤在一个页面，Google 无法区分不同课程/主题 |
| **无 sitemap.xml** | 🔴 致命 | Google 不知道你有哪些页面 |
| **无 robots.txt** | 🟡 重要 | 需要告诉爬虫哪些可抓 |
| **无结构化数据** | 🟡 重要 | 无法展示 rich snippet（星级、价格等） |
| **title 重复4次** | 🟠 严重 | 页面有 4 个 `<title>` 标签，Google 会困惑 |
| **meta desc 重复4次** | 🟠 严重 | 同上 |
| **图片无 alt 文字** | 🟡 重要 | 图片 SEO 为 0 |
| **页面 694KB** | 🟡 影响速度 | 全部内联，第一次加载慢 |
| **外部资源用百度 CDN** | 🟡 影响海外加载 | 百度 CDN 在海外速度差 |
| **无独立课程页面** | 🔴 致命 | 每个在线硕士/博士项目都没有独立 URL |

---

## 二、分阶段实施方案

### Phase 1（紧急 · 本周内完成）
**目标：让 Google 正确抓取和索引现有内容**

#### 1.1 修复 HTML 基础错误
- [ ] 删除多余的重复 `<title>` 和 `<meta description>`（当前重复了 4 次）
- [ ] 保留唯一的 `<title>`：`环球硕博网 — 全球在线硕博学位 · 在职可读 · 留服认证`
- [ ] 加强 meta description：当前太短（50字），扩到 120-160 字符
- [ ] 所有 `<img>` 补上 alt 属性

#### 1.2 添加 robots.txt
```
User-agent: *
Allow: /
Sitemap: https://clawone.site/sitemap.xml
```

#### 1.3 添加 sitemap.xml
每个 section 对应一个 URL 条目。如果还是单页结构，至少让 Google 知道首页。

#### 1.4 添加结构化数据（JSON-LD）
在 `<head>` 中添加 Organization + WebSite Schema：
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "环球硕博网",
  "url": "https://clawone.site",
  "description": "海外在线硕博学位...",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "admin@clawone.site"
  }
}
```

---

### Phase 2（重要 · 1~2 周内完成）
**目标：多页面结构，摆脱单页困境**

#### 2.1 创建独立课程页面
将热门项目 section 的每个课程拆成独立 HTML 页面：

| URL | 内容 | 关键词目标 |
|-----|------|-----------|
| `/` | 首页（品牌介绍 + 汇总） | 环球硕博网 |
| `/online-mba/` | 在线工商管理硕士 | 在线MBA、在职MBA |
| `/online-med/` | 在线教育硕士 | 在线教育硕士 |
| `/online-dba/` | 工商管理博士(DBA) | 在线DBA、在职博士 |
| `/online-mpa/` | 在线公共管理硕士 | 在线MPA |
| `/about/` | 关于我们 | 硕博留学机构 |
| `/blog/` | 文章/资讯列表 | 留学资讯 |

每个页面有自己的：
- 独立 title + meta description
- H1/H2 层级标题
- 结构化数据（Course / Product schema）
- 相关内链跳转到首页和其他课程页

#### 2.2 页面间内链网络
```
首页 → 所有课程页
在线MBA页 → 在线DBA页（"继续深造"）、首页、关于我们
在线DBA页 → 在线MBA页（"前置课程"）、首页
```

---

### Phase 3（持续优化 · 长期）
**目标：提升排名、增加流量**

#### 3.1 内容营销
- 创建 `/blog/` 博客系统（用 WordPress API 同步）
- 每月至少 2 篇 SEO 优化文章：
  - _"在职读在线MBA值得吗？"_（长尾词）
  - _"在线硕士认证流程详解"_
  - _"适合职场人的5个在线博士项目"_

#### 3.2 速度优化
- 图片迁移到 GitHub Pages 本地（不用百度 CDN）
- 首屏 LCP 优化（懒加载非首屏资源）
- 压缩 HTML（去除多余空白和内联样式）

#### 3.3 外链建设
- 在 WordPress 站（studyfuture0.wordpress.com）互相链接
- 在行业论坛、知乎等发布有价值内容引流
- 提交到 Google Business Profile（如适用）

#### 3.4 Google Search Console 监控
- 提交 sitemap
- 监控抓取错误
- 关注 Core Web Vitals 评分
- 定期检查哪些页面有流量、哪些需要优化

---

## 三、推荐优先级

```
紧急度        任务                    预估时间
-------------------------------------------
🔴 紧急     修复 title 重复           30分钟
🔴 紧急     加 robots.txt             10分钟
🔴 紧急     加 sitemap.xml            20分钟
🔴 紧急     加结构化数据              30分钟
🟡 重要     图片加 alt                1小时
🟡 重要     课程拆独立页面             2天
🟢 持续     博客/内容营销              每周
🟢 持续     速度优化                  按需
```

---

## 四、预期效果

| 指标 | 现在 | 1个月后 | 3个月后 |
|------|-----|--------|--------|
| Google 索引页面数 | 1（可能也没索引） | 5-8 | 10-15 |
| SEO 关键词排名 | 几乎为 0 | 长尾词有曝光 | 核心词进入前50 |
| 自然流量/月 | ~0 | 50-100 | 200-500 |
| 转化（评估提交） | ~0 | 个位数/周 | 稳定增长 |

---

## 五、下一步行动建议

建议先走 **Phase 1 紧急修复 + 加课程独立页面**（Phase 2）同步进行。如果要我来动手，我先做：

1. 修复 title/meta（10分钟）
2. 加 robots.txt + sitemap.xml（15分钟）  
3. 加 JSON-LD 结构化数据（20分钟）
4. 拆第一个独立页面 `/online-mba/`（先看看效果）
5. 部署验证 Google Search Console

你觉得这个方案可以吗？要不要我从 Phase 1 开始直接动手做？
