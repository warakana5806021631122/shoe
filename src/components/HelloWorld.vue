<template>
  <div class="hello">
    <div class="tabs is-toggle ">
  <ul>
    <img width="90%" src="../assets/shoe.jpg"> </br>
    <router-link to="/Stock" style="margin-top:-300px;margin-left:-500px">
    <li>
      <a>
        <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
        <br><span>WELLCOME TO SHOEBILEE</span>
      </a>
    </li>
    </router-link>
  </ul>
</div>  <br><br><br>

<table class="table is-fullwidth" >
  <tbody v-for =" (stock,key) in showstock"  >
    <tr >
      <td>  <img :src="stock.image"style="width: 100px; height: 100px;"></td><br>
      <td> </br> </br>{{stock.name}}</td>
      <td> </br></br> {{stock.number}}</td>
      <td> </br></br> {{stock.price}}</td>
   </tr>
      </tbody>
</table>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showstock: ''
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
