// جافاسكريبت للصفحة العربية - بدون حركات أفقية
document.addEventListener('DOMContentLoaded', function() {
    // شريط التنقل الثابت
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // تبديل قائمة التنقل على الهواتف
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // تأثيرات العداد (فقط حركات رأسية)
    const statValues = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element, target, duration = 2000) => {
        const startValue = 0;
        const startTime = Date.now();
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };
    
    // ملاحظة العناصر عند التمرير (فقط حركات رأسية)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // عداد الإحصائيات
                if (element.classList.contains('stat-value')) {
                    const target = parseInt(element.getAttribute('data-count'));
                    animateCounter(element, target, 1500);
                }
                
                // مهارات التقدم
                if (element.classList.contains('skill-progress')) {
                    const width = element.getAttribute('data-width') + '%';
                    setTimeout(() => {
                        element.style.width = width;
                    }, 300);
                }
                
                // الرسوم البيانية
                if (element.classList.contains('graph-bar')) {
                    const height = element.getAttribute('data-value') + '%';
                    setTimeout(() => {
                        element.style.height = height;
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // ملاحظة جميع العناصر المطلوبة
    document.querySelectorAll('.stat-value, .skill-progress, .graph-bar').forEach(el => {
        observer.observe(el);
    });
    
    // تأثير الكتابة للعنوان (بدون حركة أفقية)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // بدء الكتابة بعد تأخير
        setTimeout(typeWriter, 500);
    }
    
    // تأثير التدوير للصورة (فقط حركة رأسية)
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // فقط حركة رأسية خفيفة
            const scale = 1 + (scrolled * 0.0001);
            mainImage.style.transform = `scale(${Math.min(scale, 1.05)})`;
        });
    }
    
    // تأثير الجسيمات المتحركة حول الصورة (فقط حركات رأسية)
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const y = e.clientY - rect.top;
            
            const sparkles = document.querySelectorAll('.image-sparkle');
            
            sparkles.forEach((sparkle, index) => {
                const centerY = rect.height / 2;
                const distance = Math.abs(y - centerY);
                const maxDistance = rect.height / 2;
                const intensity = 1 - (distance / maxDistance);
                
                // حركة رأسية فقط
                const moveDistance = 20 * intensity;
                const newY = y < centerY ? -moveDistance : moveDistance;
                
                sparkle.style.transform = `translateY(${newY}px)`;
                sparkle.style.opacity = intensity;
            });
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            const sparkles = document.querySelectorAll('.image-sparkle');
            sparkles.forEach(sparkle => {
                sparkle.style.transform = 'translateY(0)';
                sparkle.style.opacity = '1';
            });
        });
    }
    
    // تأثير النقر على البطاقات (فقط حركات رأسية)
    const cards = document.querySelectorAll('.service-card, .advantage-card, .exp-item, .platform-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // تأثير التمرير (فقط حركات رأسية)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // نموذج الاتصال
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // هنا يمكنك إضافة كود لإرسال الرسالة
            console.log('إرسال الرسالة:', { name, email, message });
            
            // رسالة نجاح
            alert('تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.');
            this.reset();
        });
    }
    
    // تأثير التمرير السلس للروابط (فقط حركات رأسية)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحميل متحرك للصفحة
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // تحريك العناصر بعد التحميل (فقط حركات رأسية)
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .exp-item');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);
    });
    
    // تأثير الخلفية المتحركة (فقط حركات رأسية)
    const bgParticles = document.querySelectorAll('.bg-particle');
    bgParticles.forEach(particle => {
        const duration = 20 + Math.random() * 10;
        const delay = Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
    });
    
    // منع الحركات الأفقية للبطاقات العربية
    const arabicCard = document.querySelector('.arabic-card');
    if (arabicCard) {
        arabicCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // حركة رأسية فقط
        });
        
        arabicCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // منع الحركات الأفقية للبطاقات الإنجليزية
    const englishCard = document.querySelector('.english-card');
    if (englishCard) {
        englishCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // حركة رأسية فقط
        });
        
        englishCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});