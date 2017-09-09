<template lang="html">
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="checked ? 'checked' : ''"
      @click="change"
    />
  </label>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    radio: Boolean,
    checked: Boolean,
    value: Object | Number | String | Array
  },
  methods: {
    change (e) {
      // 单选模式
      if (this.radio && this.checked) {
        return e.preventDefault()
      }
      this.$emit(
        'change',
        { checked: !this.checked, value: this.value }
      )
    }
  }
}
</script>

<style lang="less">
.checkbox {
 position: relative;
 display: inline-block;
 padding: 6px 6px;
 cursor: pointer; }
 .checkbox input:before, .checkbox .checkbox-icon:before {
   border-color: #ddd; }
 .checkbox input:checked:before, .checkbox input:checked + .checkbox-icon:before {
   background: @theme-color;
   border-color: @theme-color; }

.checkbox input, .checkbox-icon {
 outline: none;
 position: relative;
 width: 22px;
 height: 22px;
 display: block;
 border: 0;
 background: transparent;
 cursor: pointer;
 -webkit-appearance: none; }
 .checkbox input:before, .checkbox-icon:before {
   display: table;
   width: 100%;
   height: 100%;
   border-width: 1px;
   border-style: solid;
   border-radius: 22px;
   background: #fff;
   content: ' ';
   -webkit-transition: background-color 20ms ease-in-out;
   transition: background-color 20ms ease-in-out; }

.checkbox input:after, .checkbox-icon:after {
 -webkit-transition: opacity 0.05s ease-in-out;
 transition: opacity 0.05s ease-in-out;
 -webkit-transform: rotate(-45deg);
 transform: rotate(-45deg);
 position: absolute;
 top: 33%;
 left: 25%;
 display: table;
 width: 11px;
 height: 4px;
 border: 1px solid #fff;
 border-top: 0;
 border-right: 0;
 content: ' ';
 opacity: 0; }

.checkbox input:checked:after, input:checked + .checkbox-icon:after {
  opacity: 1; }

.checkbox input:checked:after,
input:checked + .checkbox-icon:after {
  border-width: 2px;
}
</style>
