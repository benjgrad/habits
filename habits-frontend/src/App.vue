<template>
  <alert v-if="getError['show']" :message="getError['message']" :color="getError['color']" />
  <router-view />
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import Alert from './components/Alert.vue'

export default {
  components: { Alert },
  name: "App",
  computed: mapGetters(['getAccount', 'getError']),
  watch: {
    getAccount(newValue, oldValue) {
      if (newValue === null) {
        console.log("Not logged in")
        this.$router.replace('/login')
      } else if (oldValue === null) {
        console.log("You seem logged in 👍")
      }
    }
  },
  methods: mapActions(['fetchAccount']),
  created() {
    console.log("In created in App.vue")
    if (!this.getAccount)
      this.fetchAccount()
  }
}

</script>