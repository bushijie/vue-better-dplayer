<template>
  <div class="dplayer"></div>
</template>

<script>
    import DPlayer from 'dplayer'
    import 'dplayer/dist/DPlayer.min.css'
    import Hls from 'hls.js'
    import Flv from  'flv.js'
    export default {
        name: 'VueBetterDplayer',
        props: {
            model: {
                type: Object
            },
            options: {
                type: Object
            }
        },
        destroyed() {
            if (this.dplayer != null) {
                this.dplayer.destroy()
            }
            if (this.hls != null) {
                this.hls.destroy()
            }
            if(this.flvPlayer!=null){
                this.flvPlayer.pause();
                this.flvPlayer.unload();
                this.flvPlayer.detachMediaElement();
                this.flvPlayer.destroy();
                this.flvPlayer = null;
            }
        },
        mounted() {
            const self = this
            this.options.container = this.$el
            if (this.options.video.type === 'betterHls') {
                this.options.video.customType = {
                    'betterHls': function (video) {
                        self.hls = new Hls();
                        self.hls.loadSource(video.src);
                        self.hls.attachMedia(video);
                        Object.keys(Hls.Events).forEach(item => {
                            self.hls.on(Hls.Events[item], (event, data) => self.$emit(event, data, self.model))
                        });
                    }
                }
            }else if (this.options.video.type === 'betterFlv'){
                this.options.video.customType = {
                    'betterFlv': function (video, player) {
                        self.flvPlayer = Flv.createPlayer({
                            type: 'flv',
                            url: video.src
                        });
                        self.flvPlayer.attachMediaElement(video);
                        self.flvPlayer.load();
                        Object.keys(Flv.Events).forEach(item => {
                            self.flvPlayer.on(Flv.Events[item], function(event){
                                //console.log(event)
                                self.$emit("flvEvent",event,self.model)
                            })
                        })
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
                        //console.log(event)
                        self.dplayer.on(event, () => self.$emit(event))
                    })
                }
            })
        },
    }
</script>

