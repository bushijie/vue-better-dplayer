<template>
    <div class="dplayer"></div>
</template>

<script>
  import DPlayer from 'dplayer'
  import 'dplayer/dist/DPlayer.min.css'
  import  Hls from  'hls.js'
  export default {
    name: 'VueBetterDplayer',
    props: {
      model:{
        type: Object
      },
      options: {
        type: Object
      }
    },
    destroyed() {
      if (this.dplayer!=null){
        this.dplayer.destroy()
      }
      if (this.hls!=null){
        this.hls.destroy()
      }
    },
    mounted() {
      const self = this
      this.options.container = this.$el
      if (this.options.video.type === 'betterHls'){
        this.options.video.customType = {
          'betterHls': function (video) {
            self.hls = new Hls();
            self.hls.loadSource(video.src);
            self.hls.attachMedia(video);
            Object.keys(Hls.Events).forEach(item => {
              self.hls.on(Hls.Events[item], (event, data) => self.$emit(event, data,self.model))
            });
          }
        }
      }
      self.dplayer = new DPlayer(this.options)
      const events = self.dplayer.events
      Object.keys(events).forEach(item => {
        if (item === 'events') {
          return false
        } else {
          events[item].forEach(event => {
            self.dplayer.on(event, () => self.$emit(event))
          })
        }
      })
    },
  }
</script>

