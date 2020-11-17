<template>
  <input
    v-model="localValue"
    type="text"
    maxlength="4"
    @blur="onBlur"
  >
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  watch: {
    value(v) {
      this.localValue = v
    }
  },
  methods: {
    onBlur() {
      const tempValue = Number(this.localValue)
      if (isNaN(tempValue)) {
        this.localValue = this.value
        return
      }
      this.$emit('input', tempValue)
    },
  }
}
</script>

<style lang="scss">
input {
  width: 40px;
  height: 22px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-right: 5px;
  outline: 0;
  transition: all .2s;
  &:disabled {
    color: rgba(0,0,0,.25);
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
  }
}
</style>
