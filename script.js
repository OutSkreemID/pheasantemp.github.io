document.addEventListener('DOMContentLoaded', function() {
    try {
        // Мобильное меню
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav');
        
        if (burger && nav) {
            burger.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
            });
        }

        // Слайдер
        const slider = document.querySelector('.slider__container');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.slider__dots');
        
        if (slider && slides.length > 0) {
            let currentIndex = 0;
            const slideCount = slides.length;
            let autoSlide;

            function createDots() {
                if (!dotsContainer) return;
                dotsContainer.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }

            function updateSlider() {
                requestAnimationFrame(() => {
                    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                    
                    if (dotsContainer) {
                        document.querySelectorAll('.dot').forEach((dot, index) => {
                            dot.classList.toggle('active', index === currentIndex);
                        });
                    }
                });
            }

            function goToSlide(index) {
                currentIndex = (index + slideCount) % slideCount;
                updateSlider();
                resetAutoSlide();
            }

            function startAutoSlide() {
                clearInterval(autoSlide);
                autoSlide = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 5000);
            }

            function resetAutoSlide() {
                startAutoSlide();
            }

            function initSlider() {
                createDots();
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        goToSlide(currentIndex + 1);
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        goToSlide(currentIndex - 1);
                    });
                }
                
                // Клик по изображениям для открытия в полном размере
                document.querySelectorAll('.slide__content img').forEach(img => {
                    img.addEventListener('click', function() {
                        window.open(this.src, '_blank');
                    });
                });
                
                startAutoSlide();
                
                if (slider) {
                    slider.addEventListener('mouseenter', () => {
                        clearInterval(autoSlide);
                    });
                    
                    slider.addEventListener('mouseleave', () => {
                        startAutoSlide();
                    });
                }
            }

            initSlider();

            // Остановка автопрокрутки при скрытии вкладки
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    clearInterval(autoSlide);
                } else {
                    startAutoSlide();
                }
            });
        }

        // Плавный скролл
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Ошибка в скрипте:', error);
    }
});