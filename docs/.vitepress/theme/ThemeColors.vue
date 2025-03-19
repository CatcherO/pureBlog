<template></template>
<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useData } from 'vitepress'
import blogConfig from '../../../blogConfig.json'

const { isDark } = useData()

// 获取当前主题配置
const themeName = blogConfig.theme || 'default'
const themeConfig = (blogConfig as any)[themeName] || {}
const colorConfig = themeConfig.colors || {}

// 获取品牌颜色配置
const lightColors = colorConfig.light?.brand || {}
const darkColors = colorConfig.dark?.brand || {}

// 设置CSS变量
function updateColors() {
  if (typeof document === 'undefined') return

  // 获取当前模式
  const isDarkMode = isDark.value

  // 准备要设置的颜色
  const colors = isDarkMode ? darkColors : lightColors

  // 默认颜色（回退）
  const defaultLightColors = {
    '1': '#2949a4',
    '2': '#0749ff',
    '3': '#7494ec',
    'soft': 'rgba(110, 156, 190, 0.14)'
  }

  const defaultDarkColors = {
    '1': '#aa9100',
    '2': '#d5b811',
    '3': '#ecce23',
    'soft': 'rgba(186, 186, 186, 0.14)'
  }

  // 合并默认颜色和配置颜色
  const mergedColors = Object.assign(
    isDarkMode ? defaultDarkColors : defaultLightColors,
    colors
  )

  // 设置CSS变量
  if (isDarkMode) {
    document.documentElement.style.setProperty('--vp-c-yellow-1', mergedColors['1'])
    document.documentElement.style.setProperty('--vp-c-yellow-2', mergedColors['2'])
    document.documentElement.style.setProperty('--vp-c-yellow-3', mergedColors['3'])
    document.documentElement.style.setProperty('--vp-c-yellow-soft', mergedColors['soft'])
  } else {
    document.documentElement.style.setProperty('--vp-c-blue-1', mergedColors['1'])
    document.documentElement.style.setProperty('--vp-c-blue-2', mergedColors['2'])
    document.documentElement.style.setProperty('--vp-c-blue-3', mergedColors['3'])
    document.documentElement.style.setProperty('--vp-c-blue-soft', mergedColors['soft'])
  }

  // 计算RGB值用于半透明效果
  const hexToRgb = (hex: string) => {
    // 默认RGB值，如果转换失败
    if (!hex.startsWith('#')) return '0, 0, 0'
    
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  // 设置RGB值，用于rgba函数
  try {
    const primaryColorRgb = hexToRgb(mergedColors['1'])
    document.documentElement.style.setProperty(
      '--vp-c-brand-rgb', 
      primaryColorRgb
    )
  } catch (e) {
    console.error('Error setting RGB color:', e)
  }
}

// 当暗色/亮色主题切换时更新颜色
watchEffect(() => {
  updateColors()
})

// 初始化颜色
onMounted(() => {
  updateColors()
})
</script> 