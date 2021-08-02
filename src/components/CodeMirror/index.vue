<template>
  <div ref="codemirr">

  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

let codemirr = ref(null);
console.log('-----------CodeMirror',codemirr);
setTimeout(()=>{
  var myCodeMirror = CodeMirror(codemirr.value, {
  value: 'function myScript(){return 100;}\n',
  mode:  'javascript',
  theme:'monokai',
});
myCodeMirror.setSize('50%','800px');
},2000);
</script>

<style lang="scss" scoped>

</style>