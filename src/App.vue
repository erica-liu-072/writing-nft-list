<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand><span class="navbar_name">Writing NFT</span></b-navbar-brand>

        <b-navbar-toggle class="navbar_toggle" target="nav-collapse"><font-awesome-icon icon="fa-solid fa-bars" /></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link :to="{ name: 'index'}" >
              <b-nav-item >Writing NFT 列表</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'collector'}" >
              <b-nav-item>收藏列表</b-nav-item>
            </router-link>
          </b-navbar-nav>


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!--
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            -->
            <!--
            <router-link :to="{ name: 'create'}" >
              <b-nav-item>Create/Update ISCN</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'batch-create'}" >
              <b-nav-item>Batch Create/Update</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'find'}" >
              <b-nav-item>Find ISCN By ID</b-nav-item>
            </router-link>
            -->
            <div class="dropdown nav_d_item">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                敬請期待
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" type="button">敬請期待</button></li>
                <li><button class="dropdown-item" type="button">敬請期待</button></li>
              </ul>
            </div>
            <!--
            <b-nav-item-dropdown class="navbar_name" text="敬請期待"  right>
              <div class="blockdiv">
                <b-dropdown-item class="blockdiv" href="#" >敬請期待</b-dropdown-item>
                <b-dropdown-item class="blockdiv" href="#" >敬請期待</b-dropdown-item>
              </div>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
              
            </b-nav-item-dropdown>
            -->
            <!--
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>---User----</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            -->
            <b-button class="margin_l_05" v-if="$store.state.wallet" >{{this.$store.state.wallet.address.slice(0, 12)+"…"}} </b-button>
            <b-button class="margin_l_05" v-else @click="connect_wallet">連結Keplr錢包</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="mainset">
      <router-view class="router-view" />
    </div>
  </div>

</template>
<script >
import Global from "@/components/Global.vue";

 export default {
    data() {
      return { 
        rootpatch:Global.rootpatch,
      }
    },
    created() {
      //
    },
    methods: {
      connect_wallet(){
        this.$store.dispatch('connect_wallet')
      },
    }
 }
</script>

<style lang="less">
  #app {
    min-height: 100vh;
  }
  .navbar_name{
    color: #fff !important;
  }
  .navbar_toggle{
    color: #fff !important;
    font-size: 1.5rem;
  }
  .el-aside {
    background-color: #9398a0;
    padding: 0px;
  }

  .el-main {
    min-height: 100vh;
  }
  .router-view {
    width: 90%;
    margin: 0 auto;
    padding: 25px 0 25px 0;
    //display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
  }
  .mainset{
    //max-width: 722px;
    //overflow-y:auto;
    margin-top: 0.5rem;
  }
  .connect-wallet {
    text-align: center;
    padding: 20px;
  }
  body {
    margin: 0;
  }
  //.flex-grow {
  //  flex-grow: 1;
  //}
  .margin_l_05{
    margin-left:0.5rem;
  }
  //.blockdiv{
  //  display: block;
  //  width: 100%;
  //}
  .nav_d_item{
     display: block;
  }
  @media (max-width: 992px) {
     .mainset{
        max-width: 922px;
        overflow-y:auto;
     }
    .nav_d_item{
        display: block;
        margin-bottom: 0.5rem;
    }
  }
</style>
