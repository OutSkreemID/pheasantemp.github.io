document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Слайдер
    const slider = document.querySelector('.slider__container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider__dots');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Создаем точки-индикаторы
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Обновление слайдера
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем точки
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Переход к слайду
    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateSlider();
    }
    
    // Инициализация
    function initSlider() {
        createDots();
        
        // Навигация
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        // Автопрокрутка
        let autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Пауза при наведении
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
    }
    
    initSlider();
    
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
});