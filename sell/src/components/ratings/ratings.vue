<template>
  <div>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore" class="star"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect @select="selectRatings" @toggle="toggleRatings" :select-type="selectType" :only-content="onlyContent" :show-flag="showFlag"
                      :ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
              <div class="avatar">
                <img :src="rating.avatar" alt="" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score" class="star"></star>
                  <span class="deliver" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend || rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span v-for="item in rating.recommend" class="item">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import split from '../../components/split/split.vue';
  import star from '../../components/star/star.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';
  // import {bus} from '../../bus.js';

  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created() {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
      // bus.$on('ratingtype.select', this.changeSelectType);
      // bus.$on('content.toggle', this.changeOnlyContent);
    },
    methods: {
      selectRatings(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleRatings() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 174px
    left 0px
    bottom 0px
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0, 0, 137px
        padding-bottom 6px
        width 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only screen and (max-width 320px)
          flex 0, 0, 120px
          width 120px
        .score
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
          margin-bottom 6px
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .rank
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 0 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0px
          .title
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(7, 17, 27)
            line-height 18px
          .star
            display inline-block
            vertical-align top
            line-height 18px
            margin-left 12px
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            margin-left 12px
            color rgb(255, 153, 0)
        .delivery-wrapper
          font-size 0px
          .title
            font-size 12px
            color rgb(7, 17, 27)
            line-height 18px
          .time
            font-size 12px
            color rgb(147, 153, 159)
            margin-left 12px
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0, 0, 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0px
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .deliver
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
            margin-bottom 8px
          .recommend
            line-height 16px
            font-size 0px
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 0 4px
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fff
          .time
            position absolute
            top 0px
            right 0px
            font-size 10px
            color rgb(147, 153, 159)
</style>
