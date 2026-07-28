# TinyFrontendWonderland 🎨

这里汇集了许多有趣的前端小页面，每个项目都是用纯 HTML/CSS/JS 实现的创意 Demo。

---

## 项目列表

### 1. 🔲 AnimeRandomBackground — 随机方块动画

[AnimeRandomBackground](./AnimeRandomBackground/)

一个基于 [anime.js](https://animejs.com/) 的动态背景动画。页面中有 81 个彩色方块，点击 **Generate** 按钮后，所有方块随机飞散到不同位置、以不同大小重新排列，形成炫酷的随机布局效果。点击 **Circle | Square** 按钮可以在圆形和方形之间切换。

**技术要点：**
- 使用 anime.js 实现流畅的动画过渡
- `translateX`/`translateY` 随机范围 ±700px/±500px
- `scale` 随机范围 1~5 倍
- `DocumentFragment` 批量创建 DOM 元素，优化性能
- 三种颜色交替：灰色 `#444`、白色、蓝色 `#03a9f4`

---

### 2. 🌀 CircularRotation — 环形旋转

[CircularRotation](./CircularRotation/)

5 张图片沿圆形轨道旋转，同时每张图片自身以相反方向自转，形成图片始终保持正向的视觉效果。

**技术要点：**
- SCSS + Sass `math` 模块精确计算旋转角度
- 容器顺时针旋转 + 每张图片逆时针自转，两者抵消使图片始终保持正向
- `transform-origin` 定位到圆心，实现沿轨道旋转
- CSS 自定义属性 `--initial` 记录每张图片的初始偏移角度
- 无需 JavaScript，纯 CSS animation 实现

---

### 3. 🐝 HoneycombLayout — 蜂巢六边形布局

[HoneycombLayout](./HoneycombLayout/)

一个六边形（蜂巢）网格布局，10×10 的六边形阵列，每个六边形随机填充图片。鼠标悬停时，当前六边形放大（1.2×），周围一圈的 6 个六边形缩小（0.8×），形成聚光灯般的交互效果。

**技术要点：**
- `clip-path: polygon(...)` 裁剪六边形形状
- 偶数行水平偏移半个单元格宽度（`translateX(-50%)`），形成蜂巢交错布局
- 负 `margin-top` 让相邻行垂直重叠，消除行间距
- JavaScript 动态检测周围 6 个邻居，需处理奇偶行偏移导致的邻居索引差异
- 随机从 10 张图片中选取填充每个六边形

---

### 4. 🎬 SlideAnimation — 动画时间轴控制器

[SlideAnimation](./SlideAnimation/)

一个可以通过滑块（range input）手动控制 CSS 动画播放进度的 Demo。红色小球从左侧移动到右侧，同时放大并变为蓝绿色 —— 拖动滑块即可精确控制动画的任意时刻。

**技术要点：**
- `animation-play-state: paused` 暂停动画
- 通过 CSS 自定义属性 `--delay` 设置负的 `animation-delay`，利用负延迟跳过动画的前半部分来实现时间轴控制
- `<input type="range">` 的 `min="0" max="1" step="0.01"` 实现 0%~100% 的精确进度控制

---

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 / SCSS | 样式、动画、六边形裁剪 |
| 原生 JavaScript | 交互逻辑、DOM 操作 |
| [anime.js](https://animejs.com/) | 高性能动画引擎 |

## 本地运行

每个项目都是纯静态页面，直接在浏览器中打开对应的 `index.html` 即可运行。

## 项目结构

```
TinyFrontendWonderland/
├── AnimeRandomBackground/   # 随机方块动画
│   ├── index.html
│   ├── css/style.css
│   └── images/
├── CircularRotation/        # 环形旋转
│   ├── index.html
│   ├── index.scss
│   └── imgs/
├── HoneycombLayout/         # 蜂巢六边形布局
│   ├── index.html
│   ├── index.js
│   ├── index.scss
│   └── imgs/
└── SlideAnimation/          # 动画时间轴控制器
    └── index.html
```
