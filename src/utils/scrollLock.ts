export const scrollLock = {
  getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  },

  lock(): void {
    const scrollbarWidth = this.getScrollbarWidth();
    
    // Блокируем прокрутку
    document.body.style.overflow = 'hidden';
    
    // Компенсируем ширину скроллбара, чтобы избежать "прыжка" контента
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  },

  unlock(): void {
    // Возвращаем возможность прокрутки и убираем компенсацию
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}; 