<template>
 <div class="comment" v-if="commentInfo.list">
  <section class="top">
    <span>用户评价</span>
    <span>更多({{ commentInfo.cRate }})</span>
  </section>
  <section class="userComment">
    <div class="userInfo">
      <img :src="commentInfo.list[0].user.avatar" alt="" />
      <span class="userName">{{ commentInfo.list[0].user.uname }}</span>
    </div>
    <div class="commentInfo">
      <p>
        {{ commentInfo.list[0].content }}
      </p>
      <p class="explain" v-if="commentInfo.list[0].explain">
        {{ commentInfo.list[0].explain }}
      </p>
      <p class="small">
        <span>{{ timeFormat(commentInfo.list[0].created, "yyyy-mm-dd") }}</span>
        <span>{{ commentInfo.list[0].style }}</span>
      </p>
    </div>
    <div class="commentImg" v-if="commentInfo.list[0].images">
      <div v-for="(img, index) in commentInfo.list[0].images" :key="index">
        <img :src="img" alt="" />
      </div>
    </div>
  </section>
 </div>
</template>

<script>
export default {
  name: 'DetailComment',
  props: {
    commentInfo: {
      type: Object,
      default() {}
    }
  },
  computed: {
    // 时间格式
    timeFormat() {
      return function (val, str) {
        const dt = new Date(val * 1000);
        const year = (dt.getFullYear() + "").padStart(2, "0");
        const month = (dt.getMonth() + 1 + "").padStart(2, "0");
        const date = (dt.getDate() + "").padStart(2, "0");
        const hours = (dt.getHours() + "").padStart(2, "0");
        const minutes = (dt.getMinutes() + "").padStart(2, "0");
        const seconds = (dt.getSeconds() + "").padStart(2, "0");
        if (str == "yyyy-mm-dd") {
          return `${year}-${month}-${date}`;
        } else {
          return `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        }
      }
    }
  }
}
</script>

<style scoped>
.comment {
  padding: 10px;
  border-bottom: 3px solid #ccc;
}
.comment .top {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.comment .top span {
  font-weight: 550;
}
.comment .userInfo {
  padding: 10px 0;
}
.comment .userInfo img {
  width: 40px;
  border-radius: 100%;
}
.comment .userInfo .userName {
  font-size: 16px;
  margin-left: 5px;
}
.comment .commentInfo p.explain {
  margin-top: 10px;
  padding: 10px;
  background-color: #ff819862;
  border-radius: 10px;
}
.comment .commentInfo p.small {
  padding: 10px 0;
}
.comment .commentInfo p.small span {
  margin-right: 10px;
}
.comment .commentImg {
  display: flex;
  margin-bottom: 20px;
}
.comment .commentImg img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
</style>