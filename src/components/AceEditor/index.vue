<template>
    <div ref="editor" style="width:100%;height:calc(100vh - 77px)"></div>
</template>

<script setup lang="ts">
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import { ref } from '@vue/reactivity';
import { onMounted, watch,defineProps,defineEmits } from '@vue/runtime-core';

const emit = defineEmits(['changeAce']);
const props = defineProps({
  editorCode:{
    type:String,
    default:''
  },
  readonly:{
    type:Boolean,
    default:true
  }
});

const editor:any = ref(null);
let aceEditor:any = null;
const initEditor=()=> {
  aceEditor = ace.edit(editor.value, {
    fontSize: 14,
    fontFamily: 'Consolas,Monaco,monospace',

    theme: 'ace/theme/monokai',
    mode: 'ace/mode/json',
    tabSize: 4,
    useSoftTabs: true
  });
  aceEditor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true
  });


  aceEditor.alignCursors();
  aceEditor.getSession().setUseWrapMode(true);
  aceEditor.getSession().setTabSize(2);
  aceEditor.setReadOnly(props.readonly);
  aceEditor.setOption('wrap', 'free');
  aceEditor.setValue(props.editorCode);
  aceEditor.on('blur', getCode);
  aceEditor.resize();
};
onMounted(()=>{
  initEditor();
});
const getCode=()=>{
  let code = aceEditor.getSession().getValue();
  emit('changeAce',code);
};
watch(()=>props.editorCode,()=>{
  aceEditor.setValue(props.editorCode);
});
</script>

<style scoped>

</style>