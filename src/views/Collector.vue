<template>
  <b-overlay :show="show" rounded="sm">
  
  <div class="pagediv">
    
      <div class="blockdiv textalign_c margin_b_05 searchdiv">
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
      
        <div class="margin_b_05 margin_t_10">
          <div class="margin_b_05"> 
          <h4 class="searchdiv"> Writing NFT 收藏列表</h4>
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col" style="line-height: 2rem;width:2.5em;">#</th>
                <th scope="col" style="width:5em;">封面</th>
                <th scope="col" style="">標題<span class="margin_l_05"><a href="#" @click="tosort('name')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:5em">作者<span class="margin_l_05"><a href="#" @click="tosort('author')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:8em;">創建時間<span class="margin_l_05"><a href="#" @click="tosort('created_at')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(plist,index) in list" :key="index">
                  <td scope="row">{{((page-1)*perPage)+parseInt(index) + 1}}</td>
                  <td scope="row"><b-img rounded :src="plist.coverimg" :alt="plist.name" style="max-width:5em" @error="imgError(index)"></b-img></td>
                  <td scope="row"><a :href="link_burl+plist.id" target="_blank">{{plist.name}}</a></td>
                  <td scope="row">
                  
                    <router-link :to="{ name: 'creator', params: { add: plist.iscn_owner}}" >
                      {{plist.author}}
                    </router-link>
                  </td>
                  <td scope="row">{{$filter.moment(plist.created_at,"YYYY-MM-DD HH:mm:ss")}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <!--分頁-->
          <div class="margin_b_05">
            <div v-if="(page== 1 || page== 2) && totalpage >=5" class="textalign_c">
              <b-button v-if="page > 1" @click="getlist(1)" variant="outline-primary" class="margin_r_05"> {{frist}} </b-button>
              <b-button v-if="page > 1" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05"> {{prev}} </b-button>
              <span v-for="n in 5" :key="n">
                <b-button v-if="n != page" @click="getlist(n)" variant="outline-primary" class="margin_r_05">{{n}}</b-button>
                <b-button v-else variant="dark" class="margin_r_05">{{n}}</b-button>
              </span>
              <b-button v-if="page < totalpage " @click="getlist(page+1)" variant="outline-primary" class="margin_r_05"> {{next}} </b-button>
              <b-button v-if="page < totalpage " @click="getlist(totalpage)" variant="outline-primary" class="margin_r_05"> {{last}} </b-button>
            </div>
            <div v-else-if="page - 2 >=1  && page+2 <=totalpage " class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" variant="outline-primary" class="margin_r_05"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n==1" @click="getlist(page-2)" variant="outline-primary" class="margin_r_05">{{page-2}}</b-button>
                    <b-button v-else-if="n==2" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05">{{page-1}}</b-button>
                    <b-button v-else-if="n==3" variant="dark" class="margin_r_05">{{page}}</b-button>
                    <b-button v-else-if="n==4" @click="getlist(page+1)" variant="outline-primary" class="margin_r_05">{{page+1}}</b-button>
                    <b-button v-else-if="n==5" @click="getlist(page+2)" variant="outline-primary" class="margin_r_05">{{page+2}}</b-button>              
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" variant="outline-primary" class="margin_r_05"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" variant="outline-primary" class="margin_r_05"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage - 1 == page && totalpage >= 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" variant="outline-primary" class="margin_r_05"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n==1" @click="getlist(page-3)" variant="outline-primary" class="margin_r_05">{{page-3}}</b-button>
                    <b-button v-else-if="n==2" @click="getlist(page-2)" variant="outline-primary" class="margin_r_05">{{page-2}}</b-button>
                    <b-button v-else-if="n==3" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05">{{page-1}}</b-button>
                    <b-button v-else-if="n==4" variant="dark" class="margin_r_05">{{page}}</b-button>
                    <b-button v-else-if="n==5" @click="getlist(page+1)" variant="outline-primary" class="margin_r_05">{{page+1}}</b-button> 
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" variant="outline-primary" class="margin_r_05"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" variant="outline-primary" class="margin_r_05"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage == page && totalpage >= 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" variant="outline-primary" class="margin_r_05"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05"> {{prev}} </b-button>
                <span v-for="n in 5" :key="n">
                    <b-button v-if="n!=5" @click="getlist(totalpage-(5-n))" variant="outline-primary" class="margin_r_05">{{totalpage-(5-n)}}</b-button>
                    <b-button v-else variant="dark" class="margin_r_05">{{totalpage}}</b-button> 
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" variant="outline-primary" class="margin_r_05"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" variant="outline-primary" class="margin_r_05"> {{last}} </b-button>
            </div>
            <div v-else-if="totalpage < 5" class="textalign_c">
                <b-button v-if="page > 1" @click="getlist(1)" variant="outline-primary" class="margin_r_05"> {{frist}} </b-button>
                <b-button v-if="page > 1" @click="getlist(page-1)" variant="outline-primary" class="margin_r_05"> {{prev}} </b-button>
                <span v-for="n in totalpage" :key="n">
                        <b-button v-if="n != page" @click="getlist(n)" variant="outline-primary" class="margin_r_05">{{n}}</b-button>
                        <b-button v-else variant="dark" class="margin_r_05">{{n}}</b-button>
                </span>
                <b-button v-if="page < totalpage " @click="getlist(page+1)" variant="outline-primary" class="margin_r_05"> {{next}} </b-button>
                <b-button v-if="page < totalpage " @click="getlist(totalpage)" variant="outline-primary" class="margin_r_05"> {{last}} </b-button>
            </div>
          </div>
          <!--分頁 end-->
        </div>
        <div>
      <div style="text-align: left; width: 90%;">
        <iframe class="lc-margin-top-64 lc-margin-bottom-32 lc-mobile" src="https://button.like.co/in/embed/ericaliu/button?referrer=https://www.ericaworld.tw/writing-nft-list/collector" width="350" height="200" frameborder="0" data-v-b66e9a5a=""></iframe>
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
        size:5,
        collector:"",
        storewallet:this.$store.state.wallet,
        creatorlist:[
          {author: "黃牛山人",iscn_owner:"like1sf2sc6t37xhd3m0dcaq6h5dz22mtru2um3jrvh"},
          {author: "章濤",iscn_owner:"like1085q77ah9kly5rd7uxjqcz38c40ecswr29l5aq"},
          {author: "like1kcz2gaztc47zl3mcgplf9vkwl76wuzxrpssed0",iscn_owner:"like1kcz2gaztc47zl3mcgplf9vkwl76wuzxrpssed0"},
          {author: "betaback",iscn_owner:"like13v8qtt0jz6y2304559v7l29sy7prz50jqwdewn"},
          {author: "ckxpress",iscn_owner:"like13f4glvg80zvfrrs7utft5p68pct4mcq7t5atf6"},
          {author: "黃牛山人",iscn_owner:"like1axrhn76rhdp709ckwper5rt65w2kuvlh62ccj0"},
          {author: "Chung Wah Chow",iscn_owner:"like1y95wh6qrxv8l6xftak272rvjxxyscqgrewal3v"},
          {author: "許明恩",iscn_owner:"like128l3t64trehh8jnr8klqaj8c2sug6wlg4jxqf8"},
          {author: "Lusi",iscn_owner:"like1usqha7gsylljntz4phweyxq80g438e7vnpz92x"},
          {author: "like1zqf0jtzhfqftw5em5ecfv0drhqa0qs98vgphu8",iscn_owner:"like1zqf0jtzhfqftw5em5ecfv0drhqa0qs98vgphu8"},
          {author: "z1coach",iscn_owner:"like1d98l0vcxdkj3ct7p7x0ef5ynnj85sk50huvt4p"},
          {author: "like1p6xz8ma7xmra64susvp8lxpqlx48skg9e86c9d",iscn_owner:"like1p6xz8ma7xmra64susvp8lxpqlx48skg9e86c9d"},
          {author: "likecointest53274",iscn_owner:"like1cwlejjcx37l5e99sgl2eaz0x69hftcmkw77qkn"},
          {author: "like1gujprvjudechzp3q87rnjcntdcxx0h5ta5lfnf",iscn_owner:"like1gujprvjudechzp3q87rnjcntdcxx0h5ta5lfnf"},
          {author: "莎莉 Sally",iscn_owner:"like17qvxp9p5ejxvk5z0ru0epvxjkca98s5zx44tr6"},
          {author: "Makzan 麥誠",iscn_owner:"like1jwjsnrypjhen3qs6jgg74pmf7d6a32kldmwk58"},
          {author: "Pazu薯伯伯",iscn_owner:"like1fph6p38zvhhdgp7sm8zc258vk2p52ganzck5tr"},
          {author: "like1jwrscsrurz0v4w37yndxr0xrmd2pxeemcwu23f",iscn_owner:"like1jwrscsrurz0v4w37yndxr0xrmd2pxeemcwu23f"},
          {author: "aurorahuang",iscn_owner: "like1qv66yzpgg9f8w46zj7gkuk9wd2nrpqmca3huxf"},
          {author: "碼農日常",iscn_owner: "like1apsjdsw9yggu5gt6mmcvlnma9793mp4qud4zak"},
          {author: "denkeni",iscn_owner: "like1efjjhpxhmap9vuxd4857tu2a8kggyuce8drq7y"},
          {author: "fongling",iscn_owner: "like1ulcpx4wp43xkap3rqzdmmszvp478dzh6t7f0v8"}
        ]
      };
    },
    created() {
      if(this.$store.state.wallet){
        this.collector=this.$store.state.wallet.address;
      }
      if(this.collector !=""){
        this.getnft(1);
      }
      
      //console.log(this.path)
    },
    methods: {
      search(){
        this.getnft(1);
      },
      putwallet(index){
        if(index==1){
          this.search_text=this.$store.state.wallet.address;
        }
        else{
          this.collector=this.$store.state.wallet.address;
        }
      },
      async getcreator(){
        axios({
          method: 'get',
          url:url + 'getcreator',
          headers:{
            //'X-CSRF-TOKEN': '',
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
          },
          data:{}
        }).then((response)=>{
          //console.log(response.data)
          if(response.data.success){
            this.creatorlist=response.data.data.creator;
          }
          //this.creatorlist=response.data.data
          
        }).catch(function(error) {
          console.log(error)
        });
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
      async getnft(page,search_text){
        var time = new Date().getTime();
        //time=this.moment(time).valueOf();
        
        //console.log(this.moment(time).add(-30,'days').unix());
        this.list=[];
        this.alllist=[];
        var rule="";
        //var rule_num=1;
        if(this.search_text != "" || this.collector != ""){
          this.after=this.moment('2022-07-22','yyyy-mm-dd').unix();
        }
        if(this.after !=""){
          rule=rule+'after='+this.moment(this.after).unix();
        }
        else{
          rule=rule+'after='+this.moment(time).add(-7,'days').unix();
        }
        if(this.before !=""){
          rule=rule+'&before='+this.moment(this.before).add(1,'days').unix();
          //rule_num++;
        }
        if(search_text != ""){
          rule=rule+'&creator='+this.search_text;
          //rule_num++;
        }
        if(this.collector!=""){
          rule=rule+'&collector='+this.collector;
        }
        if(this.limit !=0){
          if(this.limit>100){
            this.limit=100;
          }
          rule=rule+'&limit='+this.limit;
          //rule_num++;
        }
        //console.log(rule)
        this.show=true;
        setTimeout(() => {
          this.show = false
        }, 50000);
        var res = await axios.get(`https://mainnet-node.like.co/likechain/likenft/v1/ranking?${rule}`);
        //console.log(res.data)
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
        this.totalpage=Math.ceil(res.data.classes.length / this.perPage);
        
        for(var i=0;i<res.data.classes.length;i++){
            var res2 = await axios.get(`https://mainnet-node.like.co/iscn/records/id?iscn_id=${res.data.classes[i].parent.iscn_id_prefix}`);
            //console.log(res2.data)
            var author=""
            this.creatorlist.find((item) => {
              if(item.iscn_owner == res2.data.owner){
                author=item.author
              }
            }) 
            if(author.length > 12){
              author=author.slice(0, 12)+"..."
            }
            //console.log(res2.data)
            this.alllist.push({
              id:res.data.classes[i].id,
              name:res.data.classes[i].name,
              coverimg:this.coverimg_burl+res.data.classes[i].id+".png",
              url:res.data.classes[i].uri,
              created_at:res.data.classes[i].created_at,
              uri:res.data.classes[i].uri,
              iscn_owner:res2.data.owner,
              stakeholders:res2.data.records[0].data.stakeholders.length,
              author:author
            });
        }
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
        //console.log(page)
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
      clearsearch(){
        this.before="";
        this.after="";
      }
    },
    mounted() {
        //console.log('in')
        window.addEventListener('setItem', ()=> {
            if (this.collector ==""){
              var str=sessionStorage.getItem('watchaddress');
              this.collector=str.slice(1, -1);
              //console.log(str);
              this.getnft(1)
            }

        })

      //this.reset_form();
    },
    computed: {
      
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
  .margin_b_05{
    margin-bottom: 0.5rem;
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
