<!-- ColorSelector.vue -->
<template>
    <div class="color-selector">
        <h4>Select Color</h4>
        <div class="color-options">
            <div
                v-for="(color, index) in colors"
                :key="index"
                class="color-option"
                :class="{ active: selectedColor === color.value }"
                @click="selectColor(color.value)"
            >
                <div 
                    class="color-circle"
                    :style="{ backgroundColor: color.value }"
                ></div>
                <span class="color-name">{{ color.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorSelector',
    data() {
        return {
            selectedColor: '',
            colors: [
                { name: 'Navy', value: '#000080' },
                { name: 'Black', value: '#000000' },
                { name: 'Green', value: '#228B22' },
                { name: 'Burgundy', value: '#800020' },
                { name: 'Charcoal', value: '#36454F' },
            ]
        }
    },
    methods: {
        selectColor(color) {
            this.selectedColor = color;
            this.$emit('color-selected', color);
        }
    }
}
</script>

<style scoped>
.color-selector {
    margin: 2rem 0;
}

.color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
}

.color-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #ddd;
    margin-bottom: 0.5rem;
}

.color-option.active .color-circle {
    border: 2px solid var(--dark-blue);
    box-shadow: 0 0 0 2px var(--dark-blue);
}

.color-name {
    font-size: 1.2rem;
    color: #666;
}

.color-option.active .color-name {
    color: var(--dark-blue);
    font-weight: 600;
}

@media (max-width: 599px) {
    .color-options {
        gap: 1.5rem;
    }
    
    .color-circle {
        width: 2.5rem;
        height: 2.5rem;
    }
    
    .color-name {
        font-size: 1rem;
    }
}
</style>