// 图片路径数组
const imagePaths = [];
for (let i = 1; i <= 10; i++) {
    imagePaths.push(`./imgs/${i}.png`);
}

// 获取所有六边形元素
const items = document.querySelectorAll('.item');
const lines = document.querySelectorAll('.line');

// 为每个六边形随机添加图片
items.forEach(item => {
    // 随机选择一张图片
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const randomImagePath = imagePaths[randomIndex];
    
    // 创建图片元素
    const img = document.createElement('img');
    img.src = randomImagePath;
    img.alt = `随机图片 ${randomIndex + 1}`;
    
    // 添加加载完成事件处理
    img.onload = () => {
        // 图片加载成功后添加到六边形
        item.appendChild(img);
        // 移除背景色
        item.style.backgroundColor = 'transparent';
    };
    
    // 添加加载失败事件处理
    img.onerror = () => {
        console.error(`无法加载图片: ${randomImagePath}`);
        // 加载失败时保持原背景色
    };
});

// 获取每个item在网格中的位置
function getItemPosition(item) {
    for (let i = 0; i < lines.length; i++) {
        const lineItems = lines[i].querySelectorAll('.item');
        for (let j = 0; j < lineItems.length; j++) {
            if (lineItems[j] === item) {
                return { line: i, index: j };
            }
        }
    }
    return null;
}

// 获取周围一圈的6个item，考虑奇偶行偏移
function getSurroundingItems(item) {
    const { line, index } = getItemPosition(item);
    const surrounding = [];
    
    // 判断当前行是偶数行还是奇数行
    const isEvenLine = (line % 2) - 1 === 0;
    
    // 上方行的索引
    const upperLineIndex = line - 1;
    // 下方行的索引
    const lowerLineIndex = line + 1;
    
    // 上方两个六边形
    if (upperLineIndex >= 0) {
        const upperLine = lines[upperLineIndex];
        const upperItems = upperLine.querySelectorAll('.item');
        
        // 上方左侧
        if (isEvenLine && index > 0) {
            surrounding.push(upperItems[index - 1]);
        } else if (!isEvenLine && index < upperItems.length) {
            surrounding.push(upperItems[index]);
        }
        
        // 上方右侧
        if (isEvenLine && index < upperItems.length) {
            surrounding.push(upperItems[index]);
        } else if (!isEvenLine && index + 1 < upperItems.length) {
            surrounding.push(upperItems[index + 1]);
        }
    }
    
    // 左右两个六边形 (与奇偶行无关)
    const currentLineItems = lines[line].querySelectorAll('.item');
    
    // 左侧
    if (index > 0) {
        surrounding.push(currentLineItems[index - 1]);
    }
    
    // 右侧
    if (index < currentLineItems.length - 1) {
        surrounding.push(currentLineItems[index + 1]);
    }
    
    // 下方两个六边形
    if (lowerLineIndex < lines.length) {
        const lowerLine = lines[lowerLineIndex];
        const lowerItems = lowerLine.querySelectorAll('.item');
        
        // 下方左侧
        if (isEvenLine && index > 0) {
            surrounding.push(lowerItems[index - 1]);
        } else if (!isEvenLine && index < lowerItems.length) {
            surrounding.push(lowerItems[index]);
        }
        
        // 下方右侧
        if (isEvenLine && index < lowerItems.length) {
            surrounding.push(lowerItems[index]);
        } else if (!isEvenLine && index + 1 < lowerItems.length) {
            surrounding.push(lowerItems[index + 1]);
        }
    }
    
    return surrounding;
}

// 为每个item添加鼠标事件
items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // 高亮当前item
        item.classList.add('active');
        
        // 缩小周围的item
        const surroundingItems = getSurroundingItems(item);
        surroundingItems.forEach(surroundingItem => {
            surroundingItem.classList.add('smaller');
        });
    });
    
    item.addEventListener('mouseleave', () => {
        // 移除当前item的高亮
        item.classList.remove('active');
        
        // 恢复周围的item大小
        const surroundingItems = getSurroundingItems(item);
        surroundingItems.forEach(surroundingItem => {
            surroundingItem.classList.remove('smaller');
        });
    });
});
    