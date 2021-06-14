<template>
  <b-modal 
    id="add-modal" 
    title="Add an item"
    :static="true"
    @ok="addItem($event)"
  >
    <b-form-input 
      v-model="text" 
      placeholder="Enter text"
    ></b-form-input>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import FirebaseDataService from '../services/DataService';

export default Vue.extend({
  props: ['type'],
  data() {
    return {
      text: '',
    }
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent: any, modalId: string) => {
      // clear text everytime the modal is opened
      if (modalId === 'add-modal') {
        this.text = '';
      }
    });
  },
  methods: {
    async addItem(event: any) {
      // emit event for testing
      // validation
      if (!this.text) {
        this.$bvToast.toast('Please enter some text.', {
          title: `Error!`,
          variant: 'danger',
          solid: true,
        });
        event.preventDefault();
        return
      }

      let data = {
        type: this.type,
        title: this.text
      };

      await FirebaseDataService.create(data)
        .then(() => {
          this.$bvToast.toast('You have successfully added an item.', {
            title: `Success!`,
            variant: 'success',
            solid: true,
          });

          this.$emit('success')

        })
        .catch( (e: any) => {
          console.log(e);
        })
    }
  }
})
</script>
<style lang="scss">

</style>