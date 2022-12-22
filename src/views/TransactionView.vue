<template>
  <div class="container">
    <div class="row">
      <h5>Filtreeri:</h5>
    </div>
    <div class="row justify-content-center m-5">
      <div class=" col-4">
        <select v-model="transactions.accountId"
                class="form-select" aria-label=".form-select example">
          <option selected :value="accounts.accountId">--Kõik kontod--</option>
          <option v-for="account in accounts" :key="account.accountId" :value="account.accountId">
            {{account.accountName }}
          </option>
        </select>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6 ">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

          <input v-on:click="clickSelectTypeEvent(type1)" type="radio" class="btn-check" name="options" id="option1"
                 autocomplete="off">
          <label class="btn btn-outline-dark" for="option1">Dividenditehingud</label>

          <input v-on:click="clickSelectTypeEvent(type2)" type="radio" class="btn-check" name="options" id="option2"
                 autocomplete="off">
          <label class="btn btn-outline-dark" for="option2">Ostutehingud</label>

          <input v-on:click="clickSelectTypeEvent(type3)" type="radio" class="btn-check" name="options" id="option3"
                 autocomplete="off">
          <label class="btn btn-outline-dark" for="option3">Müügitehingud</label>

          <input checked v-on:click="clickSelectTypeEvent(type4)" type="radio" class="btn-check" name="options" id="option4"
                 autocomplete="off">
          <label class="btn btn-outline-dark sele" for="option4">Kõik tehingud</label>
        </div>
      </div>
    </div>
    <div class="row justify-content-center m-3">
      <div class="col-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Kuupäev alates</span>
        <input v-model=dateFrom type="date" class="form-control" aria-label="Sizing example input">
      </div>
      <div class="col-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Kuupäev kuni</span>
        <input v-model=dateTo type="date" class="form-control" aria-label="Sizing example input">
      </div>
    </div>
    <div class="row justify-content-center m-3">
      <div class="col-12">
        <button v-on:click="getTransactionsByParameters" type="button" class="btn btn-dark m-1">Filtreeri tehingud
        </button>
        <button v-on:click="resetFilters" type="button" class="btn btn-dark m-1">Eemalda filtrid
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <table class="table table-dark table-striped">
          <thead>
          <tr>
            <th class="tableBorders" v-on:click="sortBy('date')">Kuupäev <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('ticker')">Aktsiasümbol <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('type')">Tehingutüüp <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('price')">Hind <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('currencyName')">Valuuta <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('amount')" >Kogus <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('fee')" >Tasud <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('tax')" >Maksud <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('accountName')" >Konto <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
            <th class="tableBorders" v-on:click="sortBy('')" >Tehinguväärtus <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/> </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="transaction in sortedTransactions" :key="transaction.transactionId">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.ticker }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.price }}</td>
            <td>{{ transaction.currencyName }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.fee }}</td>
            <td>{{ transaction.tax }}</td>
            <td>{{ transaction.accountName }}</td>
            <td>{{ transaction.price * transaction.amount - transaction.fee - transaction.tax }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src


export default {
  name: 'TransactionView',
  components: {},
  data: function () {
    return {
      currentSort: '',
      currentSortDirection: 'asc',

      userId: sessionStorage.getItem('userId'),

      dateFrom: null,
      dateTo: null,

      type1: 'DIV',
      type2: 'BUY',
      type3: 'SELL',
      type4: null,

      accounts: [{
        accountId: 0,
        accountName: ''
      }],

      transactions: [
        {
          transactionId:0,
          currencyId: 0,
          currencyName: '',
          accountId: null,
          accountName: '',
          date: '',
          ticker: '',
          type: '',
          price: 0,
          amount: 0,
          fee: 0,
          tax: 0,
        }]
    }

  },
  methods: {
    sortBy: function (s) {
      this.currentSort = s;
      if (s === this.currentSort) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      }
    },

    resetFilters: function () {
      this.$router.go()

    },

    getAllUserAccounts: function () {
      this.$http.get("/transaction/account", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.accounts = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    clickSelectTypeEvent: function (type) {
      this.transactions.type = type

    },

    getTransactionsByParameters: function () {
      this.$http.get("/transaction", {
            params: {
              accountId: this.transactions.accountId,
              userId: this.userId,
              dateFrom: this.dateFrom,
              dateTo: this.dateTo,
              type: this.transactions.type
            }
          }
      ).then(response => {
        console.log(response.data)
        this.transactions = response.data
      }).catch(error => {
        console.log(error)
      })
    },

  },
  computed:{
    sortedTransactions:function () {
      return this.transactions.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirection === 'desc') {
          modifier = -1;
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier;
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return modifier;
        }
        return 0;
      })
    }
  },
  beforeMount() {
    this.getAllUserAccounts();
    this.getTransactionsByParameters()
  }
}
</script>
