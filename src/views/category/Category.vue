<template>
  <div class="home">
    <NavBar>
      <template v-slot:default>
        分类
      </template>
    </NavBar>
    <div id="main-box">
      <!--  2-1 排序栏 -->
      <div class="order-tab">
        <!-- @click="tabClick" 默认会传选中项 id -->
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <!-- 侧边栏 -->
      <div class="left-menu">
        <van-sidebar v-model="activeKey">
          <van-collapse v-model="activeName">
            <van-collapse-item
              v-for="(item, index) in categories"
              :key="item.id"
              :title="item.name"
              :name="item.name"
            >
              <van-sidebar-item
                v-for="sub in item.children"
                :title="sub.name"
                :key="sub.id"
                @click="getGoods(sub.id)"
              />
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
      </div>

      <div class="goods-list">
        <div class="content">
          <van-card
            v-for="item in showGoods"
            :key="item.id"
            @click="itemClick(item.id)"
            :num="item.comments_count"
            :tag="item.comments_count >= 0 ? '流行' : '标签'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import { getHomeAllData } from "../../network/home";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import { getCategory, getCategoryGoods } from "@/network/category";
import BScroll from "better-scroll";
import BackTop from "@/components/common/backtop/BackTop";
import { useRouter } from "vue-router"; // 导入路由器
import { Toast } from "vant";
export default {
  name: "Home",
  components: { NavBar, BackTop },
  setup() {
    const router = useRouter(); //  获取路由器
    let activeKey = ref(0); //标签索引
    let categories = ref([]); // 分类数据
    let activeName = ref(["1"]); // 二级索引
    let currentCid = ref(0); //  当前分类 id
    let currentOrder = ref("sales"); //  类别
    let isShowBackTop = ref(false);
    let bscroll = reactive({}); //  4-2 声明 bscroll 对象
    const active = ref(1); //选项卡
    //  数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    //侧边点击
    const getGoods = (cid) => {
      currentCid.value = cid;
      init();
    };
    // 切换tab，获取不同数据
    const tabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentOrder.value = orders[index];
      //点选项卡的时候，重新分类
      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = res.goods.data; //  2-22 给当前排序分类赋值
        //  4-7
        nextTick(() => {
          // 当 DOM 渲染完了执行方法
          // 只要页面有变化，重新计算高度
          bscroll && bscroll.refresh();
        });
      });
    };
    //  计算属性，返回排序选项
    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    // 获取数据函数
    const init = () => {
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data; // 给数据模型 sales 项赋值
      });
      getCategoryGoods("price", currentCid.value).then((res) => {
        goods.price.list = res.goods.data; // 给数据模型 price 项赋值
      });
      getCategoryGoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.goods.data; // 给数据模型 comments_count 项赋值
      });
    };
    onMounted(() => {
      Toast.loading({ message: "我很慢，你要忍耐一下...", forbidClick: true });
      getCategory().then((res) => {
        categories.value = res.categories;
      });
      init();
      bscroll = new BScroll(document.querySelector(".goods-list"), {
        // 获取到最外层元素
        probeType: 3, // 0,1,2,3, 3 只要在运行就触发 scroll 事件
        click: true, // 是否允许点击
        pullUpLoad: true, // 上拉加载更多，默认 false
      });

      //  5-8 on注册滚动事件 - scroll 事件 - 位置 position
      bscroll.on("scroll", (position) => {
        // scroll每次滚动的时候添加到postion里面
        isShowBackTop.value = -position.y > 300; //
      });
      //  4-5 上拉加载更多数据，触发 pullingUp
      bscroll.on("pullingUp", () => {
        const page = goods[currentOrder.value].page + 1;
        //  4-8
        getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
          goods[currentOrder.value].list.push(...res.goods.data); //  通过子数组的方式进入到list中，展开数据加进去
          goods[currentOrder.value].page += 1;
        });
        // 完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp();
        nextTick(() => {
          // 当 DOM 渲染完了执行方法
          // 只要页面有变化，重新计算高度
          bscroll && bscroll.refresh();
        });
        // console.log("上拉加载更多......");
        // console.log(
        //   "centerHeight：" + document.querySelector(".content").clientHeight
        // );
        // console.log("当前类型：" + currentOrder.value + "，当前页：" + page);
      });
    });
    //  4-6 监听 任何一个变量有变化就会被触发
    watchEffect(() => {
      nextTick(() => {
        // 当 DOM 渲染完了执行方法
        // 只要页面有变化，重新计算高度
        bscroll && bscroll.refresh();
      });
    });

    // 5-6 回到顶部方法
    const bTop = () => {
      bscroll.scrollTo(0, 0, 300);
    };

    return {
      activeKey,
      getGoods,
      categories,
      activeName,
      active,
      tabClick,
      currentCid,
      goods,
      currentOrder,
      showGoods,
      isShowBackTop,
      bscroll,
      bTop,
      itemClick: (id) => {
        router.push({ path: "/Detail", query: { id } });
      },
    };
  },
};
</script>

<style scoped lang="scss">
#main-box {
  margin-top: 45px;
  display: flex;

  .order-tab {
    flex: 1; // 占一份
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed; // 固定定位
    top: 45px;
    right: 0;
    left: 130px;
  }

  .left-menu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
    .van-sidebar{
      width: 130px;
    }
  }

  .goods-list {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;
  }

  .van-card__thumb {
    width: 68px;
  }
}
</style>