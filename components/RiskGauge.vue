<template>
  <div class="gauge my-4" :style="{'--gauge-angle': angle + 'deg'}">
    <div class="cat-colors">
      <div class="gauge-cat low-risk">
        <span class="gauge-label">
          Bajo
        </span>
      </div>
      <div class="gauge-cat moderate-risk">
        <span class="gauge-label">
          Medio
        </span>
      </div>
      <div class="gauge-cat severe-risk">
        <span class="gauge-label">
          Alto
        </span>
      </div>
      <div class="gauge-cat critical-risk">
        <span class="gauge-label">
          Crítico
        </span>
      </div>
    </div>
    <div class="needle" :style="{transform: 'rotate(' + angle + 'deg)'}" />
    <div class="gauge-center">
      <div class="gauge-counter">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class RiskGauge extends Vue {
  @Prop({ default: 180 }) readonly angle!: number;
  @Prop({ default: '' }) readonly label!: string;
}
</script>

<style>

.gauge {
    position: relative;
    width: 200px;
    height: 100px;
    margin: 2rem auto;
    overflow: hidden;
    border-radius: 100px 100px 0 0;
    background-color: rgb(196, 196, 196);
    box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.28);
}

.gauge-cat {
  background: #aaa;
  overflow: hidden;
  position: absolute;
  width: 100px;
  height: 100px;
  transform-origin: 100% 100%;
}

.low-risk {
  width: 200px;
  height: 100px;
  z-index: 1;
  transform-origin: 100px 100px;
  background-color: #2ecc71;
}

.moderate-risk {
  width: 200px;
  height: 100px;
  z-index: 2;
  transform: rotate(45deg);
  transform-origin: 100px 100px;
  background-color: #f1c40f;
}

.severe-risk {
  width: 200px;
  height: 100px;
  z-index: 3;
  transform: rotate(90deg);
  transform-origin: 100px 100px;
  background-color: #e67e22;
}

.critical-risk {
  width: 200px;
  height: 100px;
  z-index: 4;
  transform: rotate(135deg);
  transform-origin: 100px 100px;
  background-color: #e74c3c;
}

.gauge-center {
    width: 50%;
    height: 50%;
    border-radius: 100px 100px 0 0;
    z-index: 6;
    bottom: 0;
    left: 25%;
    background-color: #374151;
    position: absolute;
    box-shadow: 0 -13px 15px -10px rgba(0, 0, 0, 0.28);
}

.gauge-counter {
    color: #EEE;
    text-align: center;
    top: 20px;
    position: relative
}

.needle {
  z-index: 6;
  width: 78px;
  height: 7px;
  background: #15222E;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 100%;
  border-top-right-radius: 5px;
  position: absolute;
  bottom: 4px;
  left: 20px;
  transform-origin: 100% 4px;
  animation: measure 5s infinite;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.38);
}

.gauge-label {
    color: black;
    display: inline-block;
    transform-origin: 50% 50%;
    position: relative;
    transform: rotate(292.5deg);
    transform-origin: 50% 50%;
}

.low-risk .gauge-label {
    bottom: -56px;
    left: 3px;
}

.moderate-risk .gauge-label {
    bottom: -56px;
    left: 0px;
}

.severe-risk .gauge-label {
    bottom: -53px;
    left: 6px;
}

.critical-risk .gauge-label {
    bottom: -53px;
    left: -3px;
}

@keyframes measure {
  0% {
    transform: rotate(var(--gauge-angle));
  }
  33% {
    transform: rotate(calc(var(--gauge-angle) + 1deg));
  }
  66% {
    transform: rotate(calc(var(--gauge-angle) - 1deg));
  }
}
</style>
