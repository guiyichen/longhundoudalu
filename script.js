// 主题切换功能
function switchTheme(theme) {
    const body = document.body;
    const themeBtns = document.querySelectorAll('.theme-btn');

    // 移除所有主题类
    body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');

    // 移除所有按钮的active类
    themeBtns.forEach(btn => btn.classList.remove('active'));

    // 添加选中的主题
    if (theme !== 'auto') {
        body.classList.add(`theme-${theme}`);
    }

    // 添加active类到选中的按钮
    const selectedBtn = document.querySelector(`[data-theme="${theme}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // 保存主题设置到localStorage
    localStorage.setItem('theme', theme);
}

// 导航栏功能
function printDocument() {
    window.print();
}

function exportPDF() {
    alert('PDF导出功能开发中...');
}

function exportImage() {
    alert('图片导出功能开发中...');
}

function exportWord() {
    alert('Word导出功能开发中...');
}

function exportShortcut() {
    alert('本地快捷方式导出功能开发中...');
}

function reportDocument() {
    alert('举报功能开发中...');
}

// 用户操作功能
function registerUser() {
    alert('注册功能开发中...');
}

function loginUser() {
    alert('登录功能开发中...');
}

// iOS指南模态框功能
function showIOSGuide() {
    const modal = document.getElementById('ios-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

function closeIOSModal() {
    const modal = document.getElementById('ios-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复滚动
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const iosModal = document.getElementById('ios-modal');
    const imageModal = document.querySelector('.image-modal');

    if (event.target === iosModal) {
        closeIOSModal();
    }

    if (imageModal && event.target === imageModal) {
        closeImageModal();
    }
}

// 键盘事件 - ESC键关闭模态框，箭头键导航图片
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeIOSModal();
        closeImageModal();
    }

    // 图片模态框导航
    const imageModal = document.querySelector('.image-modal');
    if (imageModal && imageModal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            navigateImage(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            navigateImage(1);
        }
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('超级文档 - 斗罗大陆魂师对决网站已加载完成');

    // 初始化主题
    initializeTheme();

    // 为所有外部链接添加安全属性
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // 为兑换码添加点击复制功能
    const codeBlocks = document.querySelectorAll('.code-text');
    codeBlocks.forEach(block => {
        block.style.cursor = 'pointer';
        block.title = '点击复制兑换码';
        block.addEventListener('click', function() {
            const codes = this.textContent.trim();
            copyToClipboard(codes);
            showCopyNotification('兑换码已复制到剪贴板！');
        });
    });

    // 为邀请码添加点击复制功能
    const inviteCodes = document.querySelectorAll('.section-title');
    inviteCodes.forEach(code => {
        if (code.textContent.includes('邀请码')) {
            code.style.cursor = 'pointer';
            code.title = '点击复制邀请码';
            code.addEventListener('click', function() {
                const inviteCode = this.textContent.replace('邀请码：', '').trim();
                copyToClipboard(inviteCode);
                showCopyNotification('邀请码已复制到剪贴板！');
            });
        }
    });

    // 为iOS指南文本添加点击功能
    const iosGuideText = document.querySelector('.content-section .content-text strong');
    if (iosGuideText && iosGuideText.textContent.includes('未受信任的企业级开发者')) {
        iosGuideText.style.cursor = 'pointer';
        iosGuideText.addEventListener('click', showIOSGuide);
    }

    // 绑定主题切换事件
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            switchTheme(theme);
        });
    });

    // 绑定用户操作事件
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    if (registerBtn) {
        registerBtn.addEventListener('click', registerUser);
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', loginUser);
    }

    // 初始化图片画廊功能
    initializeGallery();
});

// 初始化主题设置
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    switchTheme(savedTheme);
}

// 初始化图片画廊功能
function initializeGallery() {
    // 处理所有画廊图片，包括游戏图片和原有的图片
    const galleryImages = document.querySelectorAll('.gallery-image, .game-gallery .gallery-image');

    galleryImages.forEach(img => {
        // 图片加载完成事件
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // 图片加载失败事件
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjE2QzE0IDE3LjEgMTMuMSAxOCA5IDE4VjE2QzE0IDE1LjEgMTMuMSAxNCAxMiAxNEMxMC45IDE0IDEwIDE1LjEgMTAgMTZWMTRDMTAgMi45IDEwLjkgMiAxMiAyWk0xMiA3QzEyLjU1IDcgMTMgNy40NSAxMyA4VjEwQzEzIDEwLjU1IDEyLjU1IDExIDEyIDExUzExIDEwLjU1IDExIDEwVjgzQzExIDcuNDUgMTEuNDUgNyAxMiA3Wk0xMiAyMEMxMy4xIDIwIDE0IDIxIDE0IDIyVjIySDEwVjIyQzEwIDIxIDEwLjkgMjAgMTIgMjBaIiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=';
            this.classList.add('loaded');
        });

        // 点击事件
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });

        // 键盘事件 - Enter键和Space键
        img.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImageModal(this.src, this.alt);
            }
        });

        // 设置可聚焦性和提示
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `查看大图: ${img.alt}`);
    });
    });
}

// 打开图片模态框
function openImageModal(imageSrc, imageAlt) {
    // 移除现有的图片模态框
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // 获取所有画廊图片用于导航
    const allImages = Array.from(document.querySelectorAll('.gallery-image'));
    const currentIndex = allImages.findIndex(img => img.src.includes(imageSrc.split('/').pop()));

    // 创建新的图片模态框
    const modal = document.createElement('div');
    modal.className = 'image-modal modal';
    modal.innerHTML = `
        <div class="image-modal-content modal-content">
            <span class="close" onclick="closeImageModal()">&times;</span>
            ${allImages.length > 1 ? '<button class="nav-btn nav-prev" onclick="navigateImage(-1)">&#10094;</button>' : ''}
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image" data-index="${currentIndex}">
            ${allImages.length > 1 ? '<button class="nav-btn nav-next" onclick="navigateImage(1)">&#10095;</button>' : ''}
            <div class="modal-caption">${imageAlt} ${allImages.length > 1 ? `(${currentIndex + 1}/${allImages.length})` : ''}</div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 存储图片数据用于导航
    modal.dataset.images = JSON.stringify(allImages.map(img => ({ src: img.src, alt: img.alt })));
    modal.dataset.currentIndex = currentIndex;

    // 添加触摸手势支持
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // 向左滑动，显示下一张
                navigateImage(1);
            } else {
                // 向右滑动，显示上一张
                navigateImage(-1);
            }
        }
    }
}

// 关闭图片模态框
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 图片导航功能
function navigateImage(direction) {
    const modal = document.querySelector('.image-modal');
    if (!modal) return;

    const images = JSON.parse(modal.dataset.images);
    let currentIndex = parseInt(modal.dataset.currentIndex);

    currentIndex += direction;

    // 循环导航
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    const newImage = images[currentIndex];

    // 更新模态框内容
    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');

    modalImage.src = newImage.src;
    modalImage.alt = newImage.alt;
    modalImage.dataset.index = currentIndex;
    modalCaption.textContent = `${newImage.alt} (${currentIndex + 1}/${images.length})`;

    modal.dataset.currentIndex = currentIndex;
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // 兼容旧浏览器的复制方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('复制失败:', err);
        }

        textArea.remove();
    }
}

// 显示复制成功通知
function showCopyNotification(message) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // 3秒后自动移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加通知动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
