<template>
  <div class="container">
    <div class="box">
      <header class="header">分类</header>
      <div class="content"></div>
    </div>
  </div>
</template>

<style lang="stylus">
*
  padding 0
  margin 0
  list-style none
html
  font-size 26.6666667vw
html,body,.container
  width 100%
  height 100%
body
  font-size .12rem
.container
  display flex
  flex-direction column
  .box
    flex 1
    display flex
    flex-direction  column
    .header
      height .44rem
      background-color #ff6666
    .content
      flex 1
      background-color #f6b6b6
@media screen and (min-width 960px)
  html
    font-size 100px
</style>
