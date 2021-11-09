<template>
  <div class="paramsDetail">
    <div class="paramsTable">
      <div class="rule" v-if="paramsInfo.rule">
        <h3>尺码说明</h3>
        <table>
          <tr v-for="(rules, index) in paramsInfo.rule" :key="index">
            <td v-for="(rule, index) in rules" :key="index">{{rule}}</td>
          </tr>
        </table>
        <p class="small">
          ※
          以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。
        </p>
      </div>
      <div class="set" v-if="paramsInfo.info">
        <h3>参数列表</h3>
        <table>
          <tr v-for="(set, index) in paramsInfo.info" :key="index">
          <td>{{set.key}}</td>
          <td>{{set.value}}</td>
        </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParams',
  props: {
    paramsInfo: {
      type: Object,
      default() {}
    }
  },
  // created() {
  //   console.log(this.paramsInfo);
  // },
}
</script>

<style scoped>
.paramsDetail {
  padding: 10px;
}
.paramsDetail .paramsTable table{
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
}
.paramsDetail .paramsTable table tr {
  height: 40px;
  border-bottom: 1px solid #ccc;
}
.paramsDetail .paramsTable .set {
  margin-top: 30px;
}
.paramsDetail .set table tr td:first-child{
  width: 30%;
}
.paramsDetail .set table tr td:last-child {
  color: var(--color-tint);
  font-weight: bold;
}
</style>