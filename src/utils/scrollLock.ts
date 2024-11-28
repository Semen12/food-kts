export const scrollLock = {
  getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  },

  hasScrollbar(): boolean {
    return document.body.scrollHeight > window.innerHeight;
  },

  lock(): void {
    if (this.hasScrollbar()) {
      const scrollbarWidth = this.getScrollbarWidth();
      document.body.style.overflow = 'hidden';
      
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
  },

  unlock(): void {
    if (this.hasScrollbar()) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
}; 