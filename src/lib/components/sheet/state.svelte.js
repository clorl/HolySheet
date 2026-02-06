/**
 * Shared logic for the Sheet system.
 * Uses Svelte 5 runes for reactive state management.
 */
export class SheetState {
    sheet = $state(null);
    isEditMode = $state(false);
    selectedItemId = $state(null);
    currentPageIndex = $state(0);
    
    // UI Interaction State
    pendingType = $state(null); // Type of widget waiting to be drawn ('text', 'number', etc)

    // Dragging State for existing items
    isDragging = $state(false);
    dragTarget = $state(null);
    dragOffset = { x: 0, y: 0 };

	/** @param {any} initialSheet */
    constructor(initialSheet) {
        // Fallback to a default structure if no sheet is provided
        this.sheet = initialSheet || {
            name: "New Character",
            data: {},
            pages: [{ backgroundImage: "https://placehold.co/800x1100/ffffff/000000?text=Background+Sheet", items: [] }]
        };
    }

    /**
     * Getter for the currently selected item object
     */
    get selectedItem() {
        if (!this.sheet || !this.sheet.pages[this.currentPageIndex]) return null;
        return this.sheet.pages[this.currentPageIndex].items.find(i => i.id === this.selectedItemId) || null;
    }

    /**
     * Creates a new item at specific pixel coordinates (converted to % for responsiveness)
     * @param {string} type - 'text', 'number', 'longtext'
     * @param {object} coords - {x, y, w, h} in pixels relative to page container
     */
    createItemAt(type, { x, y, w, h }) {
        const newItem = {
            id: crypto.randomUUID(),
            type: type, 
            name: 'field_' + Math.random().toString(36).substring(2, 7),
            x: x, 
            y: y, 
            w: w, 
            h: h,
            fontSize: 14,
            color: '#000000',
            zIndex: 10
        };

        if (this.sheet?.pages[this.currentPageIndex]) {
            // Push to the current page's items array
            this.sheet.pages[this.currentPageIndex].items.push(newItem);
            // Select it immediately so PropertyEditor opens
            this.selectedItemId = newItem.id;
            // Clear the tool selection in Toolbar
            this.pendingType = null;
        }
    }

    /**
     * Removes the currently selected item
     */
    deleteItem() {
        if (!this.selectedItemId) return;
        const page = this.sheet.pages[this.currentPageIndex];
        page.items = page.items.filter(i => i.id !== this.selectedItemId);
        this.selectedItemId = null;
    }

    /**
     * Handles the movement logic for existing widgets
     */
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
            
            // Calculate new position as a percentage of the container size
            let newX = (me.clientX - crect.left - this.dragOffset.x) / crect.width;
            let newY = (me.clientY - crect.top - this.dragOffset.y) / crect.height;
            
            // Boundary clamping
            this.dragTarget.x = Math.max(0, Math.min(1, newX));
            this.dragTarget.y = Math.max(0, Math.min(1, newY));
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
