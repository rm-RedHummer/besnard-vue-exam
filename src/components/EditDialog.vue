<template>
  <b-modal 
    id="edit-modal" 
    title="Edit an item"
    @ok="editItem"
    @cancel="$emit('onTitleChange', previousText)"
  >
    <b-form-input 
      :value="propItem.title" 
      placeholder="Enter text"
      @input="$emit('onTitleChange',$event)"
    ></b-form-input>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import FirebaseDataService from '../services/DataService';

export default Vue.extend({
  props: ['propItem'],
  data() {
    return {
      item: {
        key: '',
        title: '',
      },
      previousText: '',
    }
  },
  mounted() {
    // cancel closing of modal when clicking outside
    this.$root.$on('bv::modal::hide', (bvEvent: any, modalId: string) => {
      if (modalId === 'edit-modal' && bvEvent.trigger === 'backdrop') {
        bvEvent.preventDefault();
      }
    });

    this.$root.$on('bv::modal::show', (bvEvent: any, modalId: string) => {
      // clear text everytime the modal is opened
      if (modalId === 'edit-modal') {
        this.previousText = this.propItem.title;
      }
    });

  },
  methods: {
    editItem(event: any) {
      if (!this.propItem.title) {
        this.$bvToast.toast('Please enter some text.', {
          title: `Error!`,
          variant: 'danger',
          solid: true,
        });
        event.preventDefault();
        return
      }
      FirebaseDataService.update(this.propItem.key, this.propItem)
        .then(() => {
          this.$bvToast.toast('You have successfully updated an item.', {
            title: `Success!`,
            variant: 'success',
            solid: true,
          });
        })
        
        .catch(e => {
          console.log(e)
        })
    },
  }
})
</script>
<style lang="scss">

</style>