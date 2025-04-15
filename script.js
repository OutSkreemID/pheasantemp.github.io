// Приветственная кнопка
document.getElementById("helloBtn").addEventListener("click", function() {
    alert("Привет! Спасибо за интерес к нашему детектору ИИ-текстов!");
});

// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация карточек при загрузке
const imageCards = document.querySelectorAll('.image-card');
imageCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});