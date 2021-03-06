<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggle">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content border-1px">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="pics">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';
  import BScroll from 'better-scroll';
  import {saveLocal, loadFromLocal} from '../../common/js/store';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() { // 监控seller属性的变化
        this.$nextTick(function () {
          this._initScroll();
          this._initPic();
        });
      }
    },
    mounted() { // 保证页面加载完毕
      this.$nextTick(function () {
        this._initScroll();
        this._initPic();
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPic() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - 6;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(function () {
            if (!this.pics) {
              this.scroll = new BScroll(this.$refs.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.pics.refresh();
            }
          });
        }
      },
      toggle() {
        this.favorite = !this.favorite;
        saveLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    components: {
      star,
      split,
      BScroll
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    left 0px
    bottom 0px
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .desc
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0px
        .star
          display inline-block
          margin-right 8px
          vertical-align top
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          font-size 10px
          line-height 18px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border 0px
        h2
          font-size 10px
          color rgb(147, 153, 159)
          line-height 10px
          margin-bottom 4px
        .content
          line-height 24px
          font-size 10px
          color rgb(7, 17, 27)
          .stress
            font-size 24px
      .favorite
        position absolute
        right 18px
        top 18px
        width 36px
        text-align center
        .icon-favorite
          display block
          line-height 24px
          font-size 24px
          margin-bottom 4px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0px 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .content
        font-size 12px
        padding 0px 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        color rgb(240, 20, 20)
        line-height 24px
      .supports
        .support-item
          padding 16px 12px
          font-size 0px
          .icon
            display inline-block
            width 16px
            height 16px
            margin-right 6px
            background-size 16px 16px
            vertical-align top
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            font-size 12px
            color rgb(7, 17, 27)
            line-height 16px
    .pic
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0px
    .info
      padding 18px 18px 0px 18px
      color rgb(7, 17, 27)
      .title
        padding-bottom 8px
        line-height 14px
        font-size 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
        line-height 16px
        font-weight 200
        &:last-child
          border none
</style>
