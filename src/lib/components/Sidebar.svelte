<script>
  let { 
    width = $bindable(300), 
    minWidth = 150, 
    maxWidth = 400, 
    isOpen = $bindable(true),
    direction = 'left', 
    children 
  } = $props();

  let isResizing = $state(false);

  function startResizing(event) {
    event.preventDefault(); // Essential to prevent losing the drag
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (e) => {
      if (!isResizing) return;

      let newWidth;
      if (direction === 'left') {
        newWidth = e.clientX;
      } else {
        newWidth = window.innerWidth - e.clientX;
      }

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        width = newWidth;
      }
    };

    const stopResizing = () => {
      isResizing = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopResizing);
  }
</script>

<aside 
  class="h-full flex bg-base-100 relative border-base-content/10 shrink-0"
  class:transition-[width]={!isResizing} 
  class:duration-300={!isResizing}
  class:flex-row={direction === 'left'}
  class:flex-row-reverse={direction === 'right'}
  class:border-r={direction === 'left' && isOpen}
  class:border-l={direction === 'right' && isOpen}
  style="width: {isOpen ? width : 0}px;"
>
  <div class="flex-1 overflow-hidden h-full">
    <div class="min-w-[200px] h-full overflow-y-auto">
      {@render children?.()}
    </div>
  </div>

  <div 
    role="slider"
    tabindex="0"
    onmousedown={startResizing}
    class="absolute top-0 bottom-0 w-2 cursor-col-resize z-50 hover:bg-primary/40 active:bg-primary transition-colors"
    class:right-[-4px]={direction === 'left'}
    class:left-[-4px]={direction === 'right'}
  ></div>
</aside>
