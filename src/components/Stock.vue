<template>
  <div class="hello">
  <ul>
    <li  @click="typeOrder()">
      <a>
        <a class="button is-white">Order Page</a>
      </a>
    </li>
    <li  @click="typestock()">
      <a>
        <a class="button is-white">Stock Page</a>
      </a>
    </li>
  </ul>
  <img width="25%" src="../assets/shop.jpg" style="margin-top:-100px;margin-left:1000px"> </br>
<div v-if = "type === 'stock'" ><br><br>
<div class="columns">
  <div class="column"></div>
    <div class="column is-two-thirds">
      <table>
        <tr>
          <td> <input class="input is-info" type="text" placeholder="ชื่อสินค้า"  v-model="data.name" ></td>  &nbsp; &nbsp; &nbsp; &nbsp;
          <td> <input class="input is-info" type="text" placeholder="จำนวน"  v-model="data.number"></td>&nbsp; &nbsp; &nbsp; &nbsp;
          <td> <input class="input is-info" type="text" placeholder="ราคา"  v-model="data.price"></td> &nbsp; &nbsp; &nbsp; &nbsp;
          <td>
            <div class="file">
                  <label class="file-label">
                  <input class="file-input" type="file" name="resume"  @change="onFileChange($event.target.files[0])"required>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
          </td> &nbsp; &nbsp; &nbsp; &nbsp;
          <td> <a class="button is-info is-outlined" @click="insert()">ADD</a> </td>
        </tr>
      </table>
    </div>
  <div class="column"></div>
</div>
<div class="columns">
  <div class="column"></div>
      <table class="table is-fullwidth" >
        <thead>
                <tr>
                      <th scope="col">Picture</th>
                      <th scope="col">Name</th>
                      <th scope="col">Number</th>
                      <th scope="col">Price</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                  </tr>
        </thead>
        <tbody v-for =" (stock,key) in showstock"  >
          <tr  v-if = "sw !== key" >
            <td>  <img :src="stock.image"style="width: 100px; height: 100px;"></td>
            <td> </br> </br>{{stock.name}}</td>
            <td> </br></br> {{stock.number}}</td>
            <td> </br></br> {{stock.price}}</td>

            <td> </br></br><a class="button is-primary is-info" @click="swap(key)">Update</a> </td>
            <td> </br></br><a class="button is-primary is-info" @click="Delete(key)">Delete</a> </td>
         </tr>
            <tr  v-else >
              <td>  <input class="input is-info" type="text"   v-model="stock.name" ></td>
              <td>   <input class="input is-info" type="text"  v-model="stock.number" ></td>
              <td>  <input class="input is-info" type="text"   v-model="stock.price" ></td>
              <td>
                <div class="file">
                      <label class="file-label">
                      <input class="file-input" type="file" name="resume"  @change="onFileChange($event.target.files[0])"required>  &nbsp; &nbsp; &nbsp; &nbsp;
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Choose a file…
                          </span>
                        </span>
                      </label>
                    </div>
              </td>
              <td> <a class="button is-primary is-outlined" @click="Update(key,stock.name,stock.number,stock.price)">Save</a> </td>
              <td> <a class="button is-primary is-outlined" @click="cancel()">Cancle</a> </td>
           </tr>
            </tbody>
      </table>
    </div>
  <div class="column"></div>


</div>
<!-- จบstock -->
<div class="order"  v-if = "type === 'Order'" >
      <table class="table is-striped is-narrow is-hoverable is-fullwidth" >

        <tbody v-for =" (stock,key) in showstock"  >
          <tr>
            <td >  <img :src="stock.image"style="width: 150px; height: 200px;"></td>
            <td>  </br></br></br><b>  {{stock.name}} </b>
            </br>  จำนวน  {{stock.number}} คู่
          </br> ราคา {{stock.price}} บาท
            </td>
            <td> </br></br></br></br>
                <div class="select">
                  <select v-model="selected">
                    <option disabled value=""></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
            </td>
            <td></td><td></td>
            <td> </br></br></br> </br>
               <!-- @click="bye(key,stock.number)" -->
                  <a  class="button is-info" @click="confirm(stock.name,stock.number,selected,stock.price,key)">
                    <span class="icon is-small">
                      <i class="fas fa-cart-plus"></i>
                    </span>
                    <span>BUY</span>
                  </a>
            </td>
         </tr>
            </tbody>
      </table>
</div>
</div>
</template>

<script>
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyCus4uL3zS-yY0HjXDUZEcy8VHeFppdeAw',
  authDomain: 'sale-1306b.firebaseapp.com',
  databaseURL: 'https://sale-1306b.firebaseio.com',
  projectId: 'sale-1306b',
  storageBucket: 'sale-1306b.appspot.com',
  messagingSenderId: '20874791321'
  }
  firebase.initializeApp(config)
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {
        name: '',
        number: '',
        price: '',
        image: ''
      },
      showstock: '',
      sw: '',
      type: 'Order'
    }
  },
  created: function () {
    this.pullData()
  },
  methods: {
    pullData: function () {
      let that = this
      firebase.database().ref('/stock/').once('value').then(function (snapshot) {
        that.showstock = snapshot.val()
      })
    },
    async insert () {
      let urlsImg = await this.createImage()
      this.data.image = urlsImg.downloadURL
      firebase.database().ref('stock').push(this.data)
      this.data.name = ''
      this.data.number = ''
      this.data.price = ''
      this.data.image = ''
      this.pullData()
    },
    async Update (key, name, number, price) {
      this.sw = ''
      let urlsImg = await this.createImage()
      firebase.database().ref('/stock/').child(key).update({
        name: name,
        number: number,
        price: price,
        image: urlsImg.downloadURL
      })
      this.sw = 'update'
      this.pullData()
    },
    Delete (key) {
      firebase.database().ref('stock').child(key).remove()
      this.pullData()
    },
    swap: function (key) {
      this.sw = key
    },
    cancel () {
      this.sw = ''
    },
    onFileChange (fileImg) {
      this.dataImg = fileImg
    },
    createImage () {
      const storageRef = firebase.storage().ref('image/' + this.dataImg.name.toLowerCase().split(' ').join('-'))
      const uploadTask = storageRef.put(this.dataImg)
      return uploadTask
    },
    typestock () {
      this.type = 'stock'
    },
    typeOrder () {
      this.type = 'Order'
    },
    bye (key, number) {
      firebase.database().ref('/stock/').child(key).update({
        number: number - 1
      })
      this.pullData()
    },
    confirm(name,number,selected,price,key) {
      if (selected<=number) {
        this.$dialog.confirm({
          title: 'Privacy Politics',
          message: name +  '</br>ราคา &nbsp;&nbsp;' + price + '</br>จำนวน &nbsp;&nbsp;' + selected + '</br>ราคารวม &nbsp;&nbsp;' + (selected*price),
          onConfirm: () => {
          firebase.database().ref('/stock/').child(key).update({
            number: number - selected
          })
          this.pullData()
        }
        })
        this.pullData()
      }
      else {
        this.$dialog.alert({
          title: 'Error',
          message: 'Insufficient Product',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa'
        })
        this.pullData()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.order{
  margin-left: 20%;
  width: 60%;
}
</style>
