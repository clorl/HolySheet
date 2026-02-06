<script>
  let { 
    width = 300, 
    minWidth = 150, 
    maxWidth = 600,
    direction = 'right',
    children = null
  } = $props();

  let isResizing = $state(false);

  function startResizing(event) {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (e) => {
      if (!isResizing) return;
      
      // Calculate width based on direction
      let newWidth;
      if (direction === 'left') {
        newWidth = e.clientX;
      } else {
        // For right-side, width is the distance from the right edge
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
  class="fixed top-0 z-2 h-full flex bg-base-100 shadow-2xl border-base-content/10"
  class:left-0={direction === 'left'}
  class:right-0={direction === 'right'}
  class:flex-row={direction === 'left'}
  class:flex-row-reverse={direction === 'right'}
  class:border-r={direction === 'left'}
  class:border-l={direction === 'right'}
  style="width: {width}px;"
>
  <div class="flex-1 overflow-y-auto h-full">
    {@render children?.()}
  </div>

  <div 
    role="slider"
    tabindex="0"
    aria-label="Resize sidebar"
    aria-valuenow={width}
    onmousedown={startResizing}
    class="w-1.5 hover:w-2 cursor-col-resize bg-transparent hover:bg-primary/40 active:bg-primary transition-all h-full shrink-0"
  ></div>
</aside>
