<template>
  <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="(item, index) in imageList" :key="index">
      <a @click="goInfo(item)">
        <el-image :src="item.imagePath" class="image" />
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import storage from "@/modules/utils/LocalStorageUtils";
import { useRouter } from "vue-router";
import { getCarousel } from "@/modules/apis/api";

export default defineComponent({
  setup() {
    let imageList = ref<object[]>([]);
    const router = useRouter();
    const goInfo = (goods: any) => {
      const clientId = storage.get("ClientInfo").id;
      router.push({
        name: "goods",
        params: {
          cid: clientId,
          gid: goods.id,
        },
      });
    };
    onMounted(()=>{
      getCarousel().then((res)=>{
        for(let data of res.data.data.showList){
          imageList.value.push(data);
        }
      })
    })


    return {
      imageList,
      goInfo,
    };
  },
});
</script>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
