<template>
  <!-- 如果数据还没加载，就不显示 -->
  <div v-if="Object.keys(goodsInfo).length !== 0" class="base-info">
    <div class="info-title">{{goodsInfo.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goodsInfo.newPrice}}</span>
      <span class="o-price">{{goodsInfo.oldPrice}}</span>
      <span v-if="goodsInfo.discount" class="discount">{{goodsInfo.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goodsInfo.columns[0]}}</span>
      <span>{{goodsInfo.columns[1]}}</span>
      <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goodsInfo.services.length-1">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{goodsInfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
 
<script>
 export default {
   name: 'DetailBaseInfo',
   props: {
     goodsInfo: {
       type: Object,
       default() {
         return {}
       }
     }
   }
 }
 </script>

 <style scoped>
 .base-info {
   margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
 }
 .info-title {
   color: #222;
 }
 .into-price {
   margin-top: 10px;
 }
 .info-price .n-price {
   font-size: 24px;
   color: var(--color-high-text);
 }
 .info-price .o-price {
   font-size: 13px;
   margin-left: 5px;
   text-decoration: line-through;
   margin: 0 5px;
 }
 .info-price .discount {
   position: absolute;
   top: -5px;
   padding: 3px 5px;
   font-size: 10px;
   border-radius: 10px;
   color: #fff;
 }
 .info-other {
   display: flex;
   justify-content: space-between;
   padding: 10px 0;
   border-bottom: 1px solid #ccc;
 }
 .info-service {
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   font-size: 12px;
   margin: 10px;
 }
 .info-service img {
   width: 15px;
 }
 </style>