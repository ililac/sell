<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  // import {bus} from '../../bus.js';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);// 派发add事件，同时将当前点击的DOM对象作为参数传入
      },
      decreaseCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0px
    .cart-decrease
      display inline-block
      padding 6px
      opacity 1
      &.move-enter-active, &.move-leave-active
        transform translate3d(0, 0, 0)
        transition all 0.4s linear
      .inner
        display inline-block
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
        transform rotate(0)
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      text-align center
      font-size 12px
      line-height 24px
      padding-top 6px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      font-size 24px
      line-height 24px
      padding 6px
      color rgb(0, 160, 220)
</style>
