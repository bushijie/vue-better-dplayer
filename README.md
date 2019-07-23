# vue-better-dplayer

**To Install:**

```
npm i vue-better-dplayer
```

**To Use:**

1| Import the component And Register the component with Vue: 

```
import VueBetterDPlayer from 'vue-better-dplayer'
Vue.use(VueBetterDPlayer)

```

2| Add it inside your application:

```
<vue-better-dplayer  style="width: 270px;height: 480px;" @hlsError="networkError" :options=options :model="model"></vue-better-player>
``` 
3| Adding Events:

```
 Hls.js HlsEvents    
 @hlsError="networkError" 
 DPlayer events
 http://dplayer.js.org/zh/guide.html#%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A
``` 

4| use vue-better-dplayer:

```
<vue-better-dplayer ref="player" style="width: 270px;height: 480px;" @hlsError="networkError" :options=options :model="model"></vue-better-player>


export default {
    mounted() {
      const player = this.$refs.player
      player.play()
      setTimeout(() => {
        player.pause()
      }, 2000)
    }
``` 
**Props**
-
 prop | type | default | details |
---|---|---|---
| model | Object | null | bind model if you need |
| options | Object | default | DPlayer options |
