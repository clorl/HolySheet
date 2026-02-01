import { CanvasItem } from '$lib/sheet.js';

/**
 * Shared state for the Sheet system.
 */
export class SheetState {
    sheet = $state(null);
    isEditMode = $state(false);
    selectedItemId = $state(null);
    currentPageIndex = $state(0);
    
    // Dragging State
    isDragging = $state(false);
    dragTarget = $state(null);
    dragOffset = { x: 0, y: 0 };

    constructor(initialSheet) {
        this.sheet = initialSheet;
    }

    get selectedItem() {
        if (!this.sheet || !this.sheet.pages[this.currentPageIndex]) return null;
        return this.sheet.pages[this.currentPageIndex].items.find(i => i.id === this.selectedItemId) || null;
    }

    // Actions
    addItem(type = 'text') {
        const newItem = CanvasItem.new({ 
            type: type, 
            name: 'field_' + Date.now(),
            x: 0.1, y: 0.1, w: 120, h: 40
        });
        if (this.sheet?.pages[this.currentPageIndex]) {
            this.sheet.pages[this.currentPageIndex].items.push(newItem);
            this.selectedItemId = newItem.id;
        }
    }

    deleteItem() {
        if (!this.selectedItemId) return;
        const page = this.sheet.pages[this.currentPageIndex];
        page.items = page.items.filter(i => i.id !== this.selectedItemId);
        this.selectedItemId = null;
    }

    startDrag(e, item) {
        if (!this.isEditMode) return;
        this.isDragging = true;
        this.dragTarget = item;
        this.selectedItemId = item.id;
        
        const rect = e.currentTarget.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;

        const handleDrag = (me) => {
            if (!this.isDragging || !this.dragTarget) return;
            const container = document.getElementById(`page-container-${this.currentPageIndex}`);
            if (!container) return;
            const crect = container.getBoundingClientRect();
            
            // Percentage based positioning for responsiveness
            this.dragTarget.x = (me.clientX - crect.left - this.dragOffset.x) / crect.width;
            this.dragTarget.y = (me.clientY - crect.top - this.dragOffset.y) / crect.height;
        };

        const stopDrag = () => {
            this.isDragging = false;
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', stopDrag);
        };

        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', stopDrag);
    }
}
