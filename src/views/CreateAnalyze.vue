<template>
  <b-overlay :show="show" rounded="sm">
  
  <div class="pagediv">
        <div class="margin_b_05 margin_t_10">
          <div class="margin_b_05"> 
          <h4 class="searchdiv"> Writing NFT 註冊狀況</h4>
          <br>
          <p>
          共有：{{total_nft}} 筆 NFT 註冊。
          </p>
          <br>
          <div id="chartPie" class="pie-wrap"></div>
          <h4 class="searchdiv"> Writing NFT 收藏狀況</h4>
          <br>
          <div id="chartPie2" class="pie-wrap"></div>
          <b-button @click="reset" variant="outline-primary"> 重新載入上方圖像 </b-button><br>
          <br>
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col" style="line-height: 2rem;width:2.5em;">#</th>
                <th scope="col" style="">註冊者<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('author')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:6em;">註冊數<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('nft_num')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:6em;">佔比<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('nft_num')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
                <th scope="col" style="width:8em;">收藏錢包數<span class="margin_l_05"><a href="javascript:void(0);" @click="tosort('collector_num')"><font-awesome-icon icon="fa-solid fa-sort" /></a></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(plist,index) in list" :key="index">
                  <td scope="row">{{((page-1)*perPage)+parseInt(index) + 1}}</td>
                  <td scope="row">
                    <router-link :to="{ name: 'creator', params: { add: plist.iscn_owner}}" >
                      {{plist.author}}
                    </router-link>
                  </td>
                  <td scope="row">{{plist.nft_num}}</td>
                  <td scope="row">{{Number((plist.nft_num/total_nft)*100).toFixed(2)}}%</td>
                  <td scope="row">{{plist.collector_num}}</td>
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
        <br>
        <div>
          <div style="text-align: left; width: 90%;">
            <iframe class="lc-margin-top-64 lc-margin-bottom-32 lc-mobile" src="https://button.like.co/in/embed/ericaliu/button?referrer=https://www.ericaworld.tw/writing-nft-list/createanalyze" width="350" height="200" frameborder="0" data-v-b66e9a5a=""></iframe>
          </div>
        </div>
    </div>
  </b-overlay>

</template>

<script>
import axios from "axios";
import Global from "@/components/Global.vue";

import * as echarts from 'echarts';
require('echarts/theme/macarons')

const url=Global.apiurl

  export default {
    inject:['reload'],
    data() {
      return { 
        show:false,
        frist:"First",
        last:'Last',
        moment:require('moment'),
        prev:"Prev",
        next:"Next",
        perPage:10,
        page:1,
        totalpage:1,
        list:[],
        alllist:[],
        limit:0,
        sort:"DESC",
        sortkey:"nft_num",
        after:"",
        before:"",
        path:this.$route.path,
        size:5,
        storewallet:this.$store.state.wallet,
        creator:"",
        creatorlist:[],
        total_nft:0,
        pie: [
          { value: 100, name: ' ' }
        ],
        pie2:{
          name:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          value:[120, 200, 150, 80, 70, 110, 130]
        },
        chartPie: null,
        chartPie2: null
      };
    },
    created() {
      
      this.updatenftlist();
    },
    methods: {
        //由後端抓資料，有另外寫一個後端存註冊錢包資訊，不在這個專案裡
      async getcreator(){
        this.show = true
        setTimeout(() => {
          this.show = false
        }, 50000);
        axios({
          method: 'get',
          url:url + 'getcreatornft_num',
          headers:{
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
          },
          data:{}
        }).then((response)=>{
          //console.log(response.data)
          if(response.data.success){
            this.alllist=response.data.data.creator;
            this.total_nft=response.data.data.totalnft;
            this.totalpage=Math.ceil(response.data.data.creator.length / this.perPage);
            this.pie=response.data.data.pie;
            var pie2_d=response.data.data.pie2;
            //this.pie2=response.data.data.pie2;
            this.pie.sort(function(a, b){
              var x = a['value'];
              var y = b['value'];
              return ((y<x)?-1:(y>x)?1:0);
            });
            pie2_d.sort(function(a, b){
              var x = a['value'];
              var y = b['value'];
              return ((y<x)?-1:(y>x)?1:0);
            });
            var test_num=0;
            var test_num2=0;
            var breakch1=0;
            var breakch2=0;
            this.pie2.name=[];
            this.pie2.value=[];
            for(var i=0;i<this.pie.length;i++){
              if(breakch1!=-1){
                if(test_num ==0){
                  test_num=test_num+this.pie[i]['value']
                }
                else{
                  if(test_num / response.data.data.totalnft >0.9){
                    this.pie.splice(i,this.pie.length-1);
                    breakch1=-1
                  }
                  else{
                    test_num=test_num+this.pie[i]['value']
                  }
                }
              }
              if(breakch2!=-1){
                if(test_num2 ==0){
                  test_num2=test_num2+pie2_d[i]['value']
                  this.pie2.name.push(pie2_d[i]['name'])
                  this.pie2.value.push(pie2_d[i]['value'])
                }
                else{
                  if(test_num2 / response.data.data.totalcollector >0.9){
                    pie2_d.splice(i,pie2_d.length-1);
                    breakch2=-1
                  }
                  else{
                    test_num2=test_num2+pie2_d[i]['value']
                    this.pie2.name.push(pie2_d[i]['name'])
                    this.pie2.value.push(pie2_d[i]['value'])
                  }
                }
              }
              if(breakch1==-1 && breakch2==-1){
                break;
              }
            }
            this.pie.push(
              {name:'其他',value:response.data.data.totalnft-test_num}
            )
            this.pie2.name.push('其他')
            this.pie2.value.push(response.data.data.totalcollector-test_num2)
            this.getnft(1);
            this.show = false
          }
        }).catch(function(error) {
          console.log(error)
        });

      },
      updatenftlist(){
        //由後端更新nft列表，後端程式碼不在這個專案裡
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
            if(response.data.success){
              this.getcreator();
            }
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
      async getnft(page){
        this.list=[];
        if(this.sort=="DESC"){
          this.sortdesc(this.sortkey);
        }
        else{
          this.sortasc(this.sortkey);
        }
        this.list=this.alllist.slice(0,this.perPage);
        this.page=page;
        this.$nextTick(() => {
          this.drawPieChart(this.pie);
        })
        this.$nextTick(() => {
          this.drawPieChart2(this.pie2);
        })
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
      },
      drawPieChart(date) {
        if (this.chartPie != null && this.chartPie != "" && this.chartPie != undefined) {
          this.chartPie.dispose();
        }
        this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
        this.chartPie.setOption({
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data:date
              }
            ]
        });
      },
      drawPieChart2(date) {
        if (this.chartPie2 != null && this.chartPie2 != "" && this.chartPie2 != undefined) {
          this.chartPie2.dispose();
        }
        this.chartPie2 = echarts.init(document.getElementById('chartPie2'),'macarons');
        this.chartPie2.setOption({
  xAxis: {
    type: 'category',
    data: date.name
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: date.value,
      type: 'bar'
    }
  ]
        });
      },
      reset(){
          this.reload();
          //this.$router.go(0);
      },
    },
    mounted() {
        this.$nextTick(() => {
          this.drawPieChart(this.pie);
        })
        this.$nextTick(() => {
          this.drawPieChart2(this.pie2);
        })
      //this.reset_form();
    },
    computed: {
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
  .pie-wrap{
    width:100%;
    height:400px;
  }
</style>
