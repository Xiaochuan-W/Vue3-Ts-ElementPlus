<template>
  <div v-if="External" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate';
import { defineProps, computed } from 'vue';

const props = defineProps({
  iconclass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
});
const External = computed(():boolean => {
  return isExternal(props.iconclass);
});
const iconName = computed(():string => {
  return `#icon-${props.iconclass}`;
});
const svgClass = computed(():string => {
  if (props.className) {
    return 'svg-icon ' + props.className;
  } else {
    return 'svg-icon';
  }
});
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconclass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.iconclass}) no-repeat 50% 50%`
  };
});

</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
