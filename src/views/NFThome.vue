<template>
  <b-overlay :show="show" rounded="sm">
  <div class="pagediv">
      <div class="blockdiv textalign_c margin_b_05 searchdiv">
        <div class="blockdiv width100 textalign_l margin_b_05">
          <label for="search_text" class="inline-block-b">NFT註冊錢包：</label>
          <input ref="search_text" type="text"  v-model="search_text"  style="width:20em" class="form-control inline-block-b"> 
          <b-button class="margin_l_05 inline-block-b" variant="outline-primary" @click="putwallet(1)">Keplr</b-button>
        </div>
        
        <div class="blockdiv width100 textalign_l margin_b_05">
          <label for="search_creator" class="inline-block-b">選擇作者：</label>
          <div class="inline-block-b margin_b_05" style="width:25em">
            <v-select 
              v-model="search_text"
              :options="creatorlist" 
              :reduce="(option) => option.iscn_owner"
              label="author"
              @change="selectchang"
            ></v-select>
          </div>
        </div>
      
        <div class="blockdiv width100 textalign_l margin_b_05">
          <div class="blockdiv width100 textalign_l margin_b_05">
            <label for="collector" class="inline-block-b">收藏人錢包：</label>
            <input ref="collector" type="text"  v-model="collector"  style="width:20em" class="form-control inline-block-b"> 
            <b-button class="margin_l_05 inline-block-b" variant="outline-primary" @click="putwallet(2)">Keplr</b-button>
          </div>
        </div>
        <div class="blockdiv width100 textalign_l margin_b_05">
          <label for="search_data" class="inline-block-b">輸入起始時間：</label>
          <input ref="after_time" id="after_time" type="date"  v-model="after" style="width:9em" class="form-control inline-block-b">~ 
          <label for="search_data" class="inline-block-b">結束時間：</label>
          <input ref="before_time" id="before_time" type="date"  v-model="before" style="width:9em" class="form-control inline-block-b"> 
        </div>
        <div class="blockdiv width100 textalign_l margin_b_05">
          <b-button variant="outline-primary" class="inline-block-b" @click="search">搜尋</b-button>
          <b-button variant="outline-primary" class="inline-block-b margin_l_05" @click="clearsearch">清除</b-button>
        </div>
      </div>
      
        <div class="margin_b_05 margin_t_10 widthmin922">
          <div class="margin_b_05"> 
          <h4 class="searchdiv"> Writing NFT 列表 〔預設列出近 7 天創建的 NFT〕</h4>
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col" style="line-height: 2rem;width:2.5em;">#</th>
                <th scope="col" style="width:5em;">封面</th>
                <th scope="col" style="">標題<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('name')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:5em">作者<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('author')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:7em">目前價格<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('price')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:5em">售出<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('soldcount')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:8em;">創建時間<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('created_at')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(plist,index) in list" :key="index">
                  <td scope="row">{{((page-1)*perPage)+parseInt(index) + 1}}</td>
                  <td scope="row"><b-img rounded :src="plist.coverimg" :alt="plist.name" style="max-width:5em" @error="imgError(index)"></b-img></td>
                  <td scope="row"><a :href="link_burl+plist.id" target="_blank">{{plist.name}}</a></td>
                  <td scope="row"><a href="#" @click="searchowner(plist.iscn_owner)">{{plist.author}}</a></td>
                  <td scope="row">{{plist.price}} Like</td>
                  <td scope="row">{{plist.soldcount}}</td>
                  <td scope="row">{{$filter.moment(plist.created_at,"YYYY-MM-DD HH:mm:ss")}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <!--分頁-->
          <div class="margin_b_05">
            <div v-if="(page== 1 || page== 2) && totalpage >=5" class="textalign_c">
              <b-button v-if="page > 1" @click="getlist(1)" squared variant="outline-primary" class="margin_r_01"> {{frist}} </b-button>
              <b-button v-if="page > 1" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01"> {{prev}} </b-button>
              <span v-for="n in 5" :key="n">
                <b-button v-if="n != page" @click="getlist(n)" squared variant="outline-primary" class="margin_r_01">{{n}}</b-button>
                <b-button v-else variant="dark" squared class="margin_r_01">{{n}}</b-button>
              </span>
              <b-button v-if="page < totalpage " @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01"> {{next}} </b-button>
              <b-button v-if="page < totalpage " @click="getlist(totalpage)" squared variant="outline-primary" class="margin_r_01"> {{last}} </b-button>
            </div>
            <div v-else-if="page - 2 >=1  && page+2 <=totalpage " class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" squared variant="outline-primary" class="margin_r_01"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n==1" @click="getlist(page-2)" squared variant="outline-primary" class="margin_r_01">{{page-2}}</b-button>
                    <b-button v-else-if="n==2" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01">{{page-1}}</b-button>
                    <b-button v-else-if="n==3" squared variant="dark" class="margin_r_01">{{page}}</b-button>
                    <b-button v-else-if="n==4" @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01">{{page+1}}</b-button>
                    <b-button v-else-if="n==5" @click="getlist(page+2)" squared variant="outline-primary" class="margin_r_01">{{page+2}}</b-button>              
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" squared variant="outline-primary" class="margin_r_01"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage - 1 == page && totalpage >= 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" squared variant="outline-primary" class="margin_r_01"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n==1" @click="getlist(page-3)" squared variant="outline-primary" class="margin_r_01">{{page-3}}</b-button>
                    <b-button v-else-if="n==2" @click="getlist(page-2)" squared variant="outline-primary" class="margin_r_01">{{page-2}}</b-button>
                    <b-button v-else-if="n==3" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01">{{page-1}}</b-button>
                    <b-button v-else-if="n==4" squared variant="dark" class="margin_r_01">{{page}}</b-button>
                    <b-button v-else-if="n==5" @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01">{{page+1}}</b-button> 
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" squared variant="outline-primary" class="margin_r_01"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage == page && totalpage >= 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" squared variant="outline-primary" class="margin_r_01"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n!=5" @click="getlist(totalpage-(5-n))" squared variant="outline-primary" class="margin_r_01">{{totalpage-(5-n)}}</b-button>
                    <b-button v-else squared variant="dark" class="margin_r_01">{{totalpage}}</b-button> 
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" squared variant="outline-primary" class="margin_r_01"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage < 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" squared variant="outline-primary" class="margin_r_01"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" squared variant="outline-primary" class="margin_r_01"> {{prev}} </b-button>
                <span v-for="n in totalpage" :key="n">
                        <b-button v-if="n != page" @click="getlist(n)" squared variant="outline-primary" class="margin_r_01">{{n}}</b-button>
                        <b-button v-else squared variant="dark" class="margin_r_01">{{n}}</b-button>
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" squared variant="outline-primary" class="margin_r_01"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" squared variant="outline-primary" class="margin_r_01"> {{last}} </b-button>
            </div>
          </div>
          <!--分頁 end-->
        </div>
        <div>
      <div style="text-align: left; width: 90%;">
        <iframe class="lc-margin-top-64 lc-margin-bottom-32 lc-mobile" src="https://button.like.co/in/embed/ericaliu/button?referrer=https://www.ericaworld.tw/writing-nft-list/" width="350" height="200" frameborder="0" data-v-b66e9a5a=""></iframe>
      </div>
      </div>
    </div>
  </b-overlay>

</template>

<script>
import axios from "axios"
import Global from "@/components/Global.vue";
const url=Global.apiurl
  export default {
    data() {
      return { 
        show:false,
        frist:"First",
        last:'Last',
        moment:require('moment'),
        link_burl:"https://liker.land/nft/class/",
        coverimg_burl:"https://api.like.co/likernft/metadata/image/class_",
        prev:"Prev",
        next:"Next",
        perPage:10,
        page:1,
        totalpage:1,
        list:[],
        alllist:[],
        limit:0,
        sort:"DESC",
        sortkey:"created_at",
        search_text:"",
        after:"",
        before:"",
        path:this.$route.path,
        creatorlist:[],
        size:5,
        collector:""
      };
    },
    computed: {

    },
    created() {
      if(this.$route.params.add){
        this.search_text=this.$route.params.add;
      }
      this.getcreator();
    },
    methods: {
      async getcreator(){
        this.show = true
        setTimeout(() => {
          this.show = false
        }, 50000);
        axios({
          method: 'get',
          url:url + 'getcreator',
          headers:{
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
          },
          data:{}
        }).then((response)=>{
          if(response.data.success){
            this.creatorlist=response.data.data.creator;
            this.show = false
            this.updatenftlist();
          }
          
        }).catch(function(error) {
          console.log(error)
        });
      },
      updatenftlist(){
        this.show = true
        setTimeout(() => {
          this.show = false
        }, 50000);
        axios({
            method: 'post',
            url:url + 'updatenftlist',
            headers:{
              'Access-Control-Allow-Origin': '*',
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
            },
            data:{}
          }).then((response)=>{
            this.show = false
            if(response.data.success){
             this.getnft(1);
            }

          }).catch(function(error) {
            console.log(error)
          });
      },
      search(){
        this.getnft(1);
      },
      searchowner(owner){
        this.search_text=owner;
        this.getnft(1);
      },
      clearsearch(){
        this.search_text="";
        this.before="";
        this.after="";
        this.collector="";
      },
      putwallet(index){
        if(index==1){
          this.search_text=this.$store.state.wallet.address;
        }
        else{
          this.collector=this.$store.state.wallet.address;
        }
        
        //console.log(this.$store.state)
      },
      tosort(key){
        this.page=1;
        if(this.sortkey == key){
          if(this.sort=="DESC"){
            this.sort="ASC";
          }
          else{
            this.sort="DESC";
          }
        }
        else{
          this.sortkey=key;
        }
        if(this.sort=="DESC"){
          this.sortdesc(key);
        }
        else{
          this.sortasc(key);
        }
        this.getlist(1);
      },
      async getnft(page){
        if(this.search_text==null){
          this.search_text=""
        }
        var time = new Date().getTime();
        this.list=[];
        this.alllist=[];
        var rule="";
        if(this.search_text != "" || this.collector != ""){
          this.after=this.moment('2022-07-22','yyyy-MM-dd').unix();
        }
        if(this.after !=""){
          rule=rule+'after='+this.moment(this.after).unix();
        }
        else{
          rule=rule+'after='+this.moment(time).add(-7,'days').unix();
        }
        if(this.before !=""){
          rule=rule+'&before='+this.moment(this.before).add(1,'days').unix();
        }
        if(this.search_text != ""){
          rule=rule+'&creator='+this.search_text;
        }
        if(this.collector!=""){
          rule=rule+'&collector='+this.collector;
        }
        if(this.limit !=0){
          if(this.limit>100){
            this.limit=100;
          }
          rule=rule+'&limit='+this.limit;
        }
        this.show=true;
        setTimeout(() => {
          this.show = false
        }, 50000);
        var res = await axios.get(`https://mainnet-node.like.co/likechain/likenft/v1/ranking?${rule}`);
        if(! res.data.classes){
              this.$message({
                message: `沒有回傳資料。`,
                type: "warning",
              });
              this.show = false;
              this.page=1;
              this.totalpage=0;
              return;
        }
        
        
        for(var i=0;i<res.data.classes.length;i++){
          let exist=false;
          try {
            var res2= await axios.get(`https://api.like.co/likernft/purchase?class_id=${res.data.classes[i].id}`);
            exist=true;
          } catch (e) {
            exist=false;
          }
          if(exist){
              var author=res2.data.metadata.creatorWallet
              this.creatorlist.find((item) => {
                if(item.iscn_owner == res2.data.metadata.creatorWallet){
                  author=item.author
                }
              }) 
              if(author.length > 12){
                author=author.slice(0, 12)+"..."
              }
              this.alllist.push({
                id:res.data.classes[i].id,
                name:res.data.classes[i].name,
                coverimg:this.coverimg_burl+res.data.classes[i].id+".png",
                url:res.data.classes[i].uri,
                created_at:res.data.classes[i].created_at,
                uri:res.data.classes[i].uri,
                iscn_owner:res2.data.metadata.creatorWallet,
                author:author,
                soldcount:res2.data.metadata.soldCount,
                price:res2.data.metadata.currentPrice
              });
          }
        }
        console.log(this.alllist)
        this.totalpage=Math.ceil(this.alllist.length / this.perPage);
        if(this.sort=="DESC"){
          this.sortdesc(this.sortkey);
        }
        else{
          this.sortasc(this.sortkey);

        }
        this.list=this.alllist.slice(0,this.perPage);
        this.page=page;
        this.show = false;
      },
      getlist(page){
        this.page=page;
        this.list=this.alllist.slice((page-1)*this.perPage,page*this.perPage);
      },
      imgError(index){
        this.list[index].coverimg="https://www.ericaworld.tw/writing-nft-list/img/1660744363no_images.jpg"
      },
      sortdesc(key){
        this.alllist.sort(function(a, b){
            var x = a[key];
            var y = b[key];
            return ((y<x)?-1:(y>x)?1:0);
        });
      },
      sortasc(key){
        this.alllist.sort(function(a, b){
          var x = a[key];
          var y = b[key];
          return ((x<y)?-1:(x>y)?1:0);
        });
      },
      selectchang() {
        console.log(this.search_text)
      }
    },
    mounted() {
      //
    },
    components: {
      //
    }
  };
</script>

<style lang="less" scoped>
  .pagediv{
    width: 100%;
  }
  .blockdiv{
    display: block;
    width: 100%;
  }
  .inline-block-b{
    display:inline-block;
  }
  .searchdiv{
    min-width: 722px;
  }
  .width100{
    width:100%;
  }
  .width060{
    width:60%;
  }
  .width015{
    width:15%;
  }
  .widthmin922{
    min-width: 922px;
  }
  .margin_b_05{
    margin-bottom: 0.5rem;
  }
  .margin_r_01{
    margin-right: 0.1rem;
  }
  .margin_r_05{
    margin-right: 0.5rem;
  }
  .margin_l_05{
    margin-left: 0.5rem;
  }
  .margin_t_10{
    margin-top: 1rem;
  }
  .textalign_c{
    text-align: center;
  }
  .textalign_r{
    text-align: right;
  }
  .textalign_l{
    text-align:left;
  }
</style>
