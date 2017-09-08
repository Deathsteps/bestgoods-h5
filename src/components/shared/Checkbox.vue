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
    checked: Boolean,
    value: Object | Number | String | Array
  },
  methods: {
    change () {
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
 padding: 7px 7px;
 cursor: pointer; }
 .checkbox input:before, .checkbox .checkbox-icon:before {
   border-color: #ddd; }
 .checkbox input:checked:before, .checkbox input:checked + .checkbox-icon:before {
   background: @theme-color;
   border-color: @theme-color; }

.checkbox input, .checkbox-icon {
 position: relative;
 width: 28px;
 height: 28px;
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
   border-radius: 28px;
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
 width: 14px;
 height: 6px;
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
