<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
      <button @click="addVideo">添加一个正常视频</button>
      <button @click="addErrorVideo">添加一个错误视频</button>
      <button @click="delVideo">删除第一个视频</button>
      <button @click="addVideos">添加多个</button>
    </div>
    <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
      <template v-for="(item, index) in items">
        <vue-better-dplayer  v-bind:key="item.objectId"  :model="item" style="width: 270px;height: 480px;" @hlsError="networkError" :options="getOptions(item)"></vue-better-dplayer>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data:function () {
      return {
        items:[],
        options: {
          video: {
            url: 'http://player.mecomall.com/live/49130_5758f0391095c536cf0326d9d65eea53.m3u8',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
            type: 'betterHls',
            mutex:true
          },
          autoplay: true
        }
      }},
    methods:{
      getOptions(model){
        return {
          mutex:false,
          video: {
            url: model.videoUrl,
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
            type: 'betterHls'
          },
          autoplay: true
        }
      },
      networkError(data, model) {
        console.log('networkError callback  ' + model.objectId)
        console.log(data.type)
        var pos = null;
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].objectId === model.objectId) {
            pos = i;
          }
        }
        this.toast("自动删除错误视频 " + model.objectId)
        this.items.splice(pos, 1)
      },
      toast(str) {
        this.$message({
          message: str,
          type: 'error'
        });
      },
      getObjectId() {
        return Math.random().toString(36).slice(-8);
      },
      addVideo() {
        this.items.push({
          objectId: this.getObjectId(),
          videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        })
        //arr.unshift('w') 向前添加
      },
      addErrorVideo() {
        this.count++;
        this.items.push({
          objectId: this.getObjectId(),
          videoUrl: 'http://player.mecomall.com/live/49130_57afedf57f5364e9cbda38cc9f421bfe.m3u8'
        })
      },
      delVideo() {
        console.log(this.items);
        //this.items.pop()
        //this.items.shift()
        var item = this.items.splice(0, 1)
        console.log(item)
        //this.items.shift()
        //this.items.pop()
      },
      addVideos() {
        var videoModel1 = {
          objectId: this.getObjectId(),
          videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        }
        var videoModel2 = {
          objectId: this.getObjectId(),
          videoUrl: 'http://player.mecomall.com/live/49130_5758f0391095c536cf0326d9d65eea53.m3u8'
        }
        var videoModel3 = {
          objectId: this.getObjectId(),
          videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        }
        var videoModel4 = {
          objectId: this.getObjectId(),
          videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        }
        var videoModel5 = {
          objectId: this.getObjectId(),
          videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        }
        this.items.push(videoModel1)
        this.items.push(videoModel2)
        this.items.push(videoModel3)
        this.items.push(videoModel4)
        this.items.push(videoModel5)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
