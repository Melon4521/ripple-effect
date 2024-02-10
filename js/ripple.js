function ripple(buttons, setting = {
  duration: 300,
  timingFunction: 'ease',
  delay: 0,
  border: false,
}) {
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Константы
      const targetItem = e.target.closest('[data-ripple]');
      const rippleCircle = document.createElement('span');
      const diametr = Math.max(targetItem.offsetWidth, targetItem.offsetHeight);
      const radius = diametr / 2;

      // Добавляем класс
      rippleCircle.classList.add('ripple-circle');

      // Опрделяем позицию
      rippleCircle.style.top = `${e.pageY - targetItem.getBoundingClientRect().top - radius}px`;
      rippleCircle.style.left = `${e.pageX - targetItem.getBoundingClientRect().left - radius}px`;

      // Опрделяем размер
      rippleCircle.style.width = rippleCircle.style.height = diametr + 'px';

      // Настройка анимации и стилей
      rippleCircle.style.animationDuration = setting.duration + 'ms' ?? '500ms';
      rippleCircle.style.animationTimingFunction = setting.timingFunction ?? 'ease';
      rippleCircle.style.animationDelay = setting.delay + 'ms' ?? 0;
      rippleCircle.style.border = setting.border ? '2px solid rgba(255, 255, 255, 0.6)' : 'none';

      // Добавляем rippleCircle внутрь кнопки, включаем анимацию
      targetItem.append(rippleCircle)

      // Завершение анимации
      rippleCircle.addEventListener('animationend', rippleAnimationEnd);

      function rippleAnimationEnd() {
        if (targetItem.querySelector('.ripple-circle')) {
          rippleCircle.remove();
        }
        rippleCircle.removeEventListener('animationend', rippleAnimationEnd);
      }
    });
  });
}

ripple(document.querySelectorAll('[data-ripple]'), {
  duration: 400,
  timingFunction: 'ease-in',
  border: true,
})