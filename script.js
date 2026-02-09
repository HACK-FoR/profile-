// جافاسكريبت للصفحة الرئيسية - بدون حركات أفقية
document.addEventListener('DOMContentLoaded', function() {
    // تأثير عداد الإحصائيات
    const statValues = document.querySelectorAll('.stat-value');
    
    if (statValues.length > 0) {
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('+') ? '+' : '';
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeProgress = 1 - Math.pow(2, -10 * progress);
                const currentValue = Math.floor(easeProgress * target);
                
                stat.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            // بدء العد بعد تأخير قصير
            setTimeout(updateCounter, 500);
        });
    }
    
    // تأثير تتبع الماوس للدوائر (فقط حركات رأسية)
    const circles = document.querySelectorAll('.circle');
    
    document.addEventListener('mousemove', (e) => {
        const mouseY = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = 0.1 + (index * 0.05);
            const y = (mouseY - 0.5) * 50 * speed;
            
            circle.style.transform = `translateY(${y}px)`; // حركة رأسية فقط
        });
    });
    
    // تأثير اهتزاز للبطاقات عند التمرير (فقط حركات رأسية)
    const langCards = document.querySelectorAll('.lang-card');
    
    const createRipple = (element, x, y) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    };
    
    langCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createRipple(card, x, y);
            
            // اهتزاز خفيف (فقط رأسية)
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // تأثير التكبير للصورة عند التمرير (فقط حركات رأسية)
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg) {
        let scale = 1.05;
        let targetScale = 1.05;
        let scaleSpeed = 0;
        
        window.addEventListener('scroll', () => {
            targetScale = 1.05 + (window.pageYOffset * 0.0001);
            scaleSpeed = 0.1;
        });
        
        const animateScale = () => {
            scale += (targetScale - scale) * scaleSpeed;
            profileImg.style.transform = `scale(${Math.min(scale, 1.1)})`; // فقط تكبير
            requestAnimationFrame(animateScale);
        };
        
        animateScale();
    }
    
    // تأثير النقاط العائمة (فقط حركات رأسية)
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        dot.style.animationDuration = `${3 + index}s`;
        dot.style.animationDelay = `${index * 0.5}s`;
    });
    
    // تأثير ظهور العناصر عند التمرير (فقط حركات رأسية)
    const animatedElements = document.querySelectorAll('.animate-title, .animate-subtitle, .animate-fade, .animate-slide-left, .animate-slide-right, .animate-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)'; // فقط حركة رأسية
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // إزالة التحولات الأفقية من الأنيميشنز
    document.querySelectorAll('.animate-slide-left, .animate-slide-right').forEach(el => {
        el.style.transform = 'translateY(30px)'; // تغيير من X إلى Y
    });
    
    // تأثير كتابة للنص الوصفي
    const description = document.querySelector('.description');
    if (description) {
        const originalText = description.textContent;
        description.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                description.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});