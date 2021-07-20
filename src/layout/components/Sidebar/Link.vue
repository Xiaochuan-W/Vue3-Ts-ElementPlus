<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { defineProps,computed } from 'vue';
import { isExternal } from '@/utils/validate';

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

const External = computed(()=>isExternal(props.to));
const type = computed(()=>{
  if (External.value) {
    return 'a';
  }
  return 'router-link';
});

const linkProps = (to:string)=>{
if (External.value) {
  return {
    href: to,
    target: '_blank',
    rel: 'noopener'
  };
  }
  return {
    to
  };
};

</script>
