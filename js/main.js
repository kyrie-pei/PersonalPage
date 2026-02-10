// ==================== 打字机效果 ====================
const typingText = document.querySelector('.typing-text');
const phrases = [
    '欢迎来到我的世界...',
    '我是 Kyrie Pei',
    '创造者 · 开发者 · 创新者',
    'Welcome to my world...'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // 停顿
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ==================== 滚动渐入动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ==================== 平滑滚动 ====================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 联系表单 ====================
const contactForm = document.querySelector('.contact-form');
const sendButton = contactForm.querySelector('.btn-primary');

if (sendButton) {
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        let isEmpty = false;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isEmpty = true;
                input.style.borderColor = '#ff0055';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });

        if (!isEmpty) {
            sendButton.textContent = '发送中...';
            sendButton.disabled = true;

            // 模拟发送
            setTimeout(() => {
                sendButton.textContent = '发送成功！';
                sendButton.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';

                setTimeout(() => {
                    sendButton.textContent = '发送消息';
                    sendButton.style.background = '';
                    sendButton.disabled = false;
                    inputs.forEach(input => input.value = '');
                }, 2000);
            }, 1500);
        }
    });
}

// ==================== 技能标签动画 ====================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ==================== 项目卡片悬停效果增强 ====================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== 导航栏滚动效果 ====================
let lastScroll = 0;
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ==================== 鼠标跟随效果 ====================
const createFollower = () => {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });

    const animate = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
        requestAnimationFrame(animate);
    };

    animate();
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 启动打字机效果
    setTimeout(typeEffect, 1000);

    // 初始化滚动观察
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 创建鼠标跟随效果（仅在桌面端）
    if (window.innerWidth > 768) {
        createFollower();
    }

    // 添加齿轮鼠标交互
    const gears = document.querySelectorAll('.gear');
    gears.forEach(gear => {
        gear.addEventListener('mouseenter', () => {
            gear.style.filter = 'brightness(1.5)';
        });

        gear.addEventListener('mouseleave', () => {
            gear.style.filter = 'brightness(1)';
        });
    });

    // 添加入场动画
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        heroCard.style.opacity = '0';
        heroCard.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroCard.style.transition = 'opacity 1s ease, transform 1s ease';
            heroCard.style.opacity = '1';
            heroCard.style.transform = 'translateY(0)';
        }, 500);
    }
});

// ==================== 性能优化：节流 ====================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== 视差滚动效果 ====================
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const gears = document.querySelectorAll('.gear');

    gears.forEach((gear, index) => {
        const speed = (index + 1) * 0.05;
        gear.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 16));
