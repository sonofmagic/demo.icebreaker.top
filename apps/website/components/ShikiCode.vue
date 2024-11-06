<script setup lang="ts">
import type { BuiltinLanguage, BuiltinTheme } from 'shiki'
import { throttle } from 'lodash-es'
import { codeToHtml } from 'shiki'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  code?: string
  lang?: BuiltinLanguage
  theme?: BuiltinTheme
}>(), {
  lang: 'javascript',
  theme: 'github-dark',
})

const domRef = ref<HTMLDivElement>()

async function _update() {
  if (props.code && domRef.value) {
    const html = await codeToHtml(props.code, {
      lang: props.lang,
      theme: props.theme,
    })
    domRef.value.innerHTML = html
  }
}

const update = throttle(_update, 200)

onMounted(() => {
  update()
})

watch(() => props.code, () => {
  update()
}, {
  immediate: true,
})
</script>

<template>
  <div ref="domRef" />
</template>

<style scoped></style>
