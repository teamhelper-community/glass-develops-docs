<script setup>

const props = defineProps({
  videoSrc: String,
  description: String,
  width: {
    type: String,
    default: '80%'
  },
  height: {
    type: String,
    default: '80%'
  }
})
</script>
<template>
  <div class="player-container" :style="{
    width: width,
    height: height
  }">
    <video controls autoplay muted loop>
      <source :src="videoSrc" type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  </div>
  <div v-if="description">
    <p class="video-description">{{ description }}</p>
  </div>
</template>
<style>
.player-container {
  display: flex;
  flex-direction: column; /* 垂直排列内容 */
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.video-description {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  text-align: center;
}
</style>