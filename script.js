document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const caption = document.querySelector('.slider-caption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    
    // Подписи для слайдов
    const captions = [
        "1. История развития ИИ (1906-2022)",
        "2. Основные проблемы нейросетей",
        "3. Как определить нейротекст",
        "4. Функции современных нейросетей",
        "5. Примеры ИИ-текстов с ошибками"
    ];
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
    
    // Создаем индикаторы
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Обновление слайдера
    function updateSlider() {
        if (isAnimating) return;
        
        isAnimating = true;
        slider.style.transition = 'transform 0.5s ease-out';
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем подпись
        caption.textContent = captions[currentIndex];
        
        // Обновляем индикаторы
        document.querySelectorAll('.indicator').forEach((ind, idx) => {
            ind.classList.toggle('active', idx === currentIndex);
        });
        
        // Сбрасываем анимацию
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Переход к слайду
    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    }
    
    // Автопрокрутка
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Инициализация
    function initSlider() {
        createIndicators();
        startAutoSlide();
        
        // Навигация
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        // Пауза при наведении
        slider.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.parentElement.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Приветственное сообщение
    document.getElementById('helloBtn').addEventListener('click', function() {
        alert('Добро пожаловать! Отправьте нам текст для анализа.');
    });
    
    // Плавный скролл
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Запуск слайдера
    initSlider();
});