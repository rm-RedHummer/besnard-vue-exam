<template>
  <section class="home">
    <b-container>
      <b-row>
        <b-col 
          cols="12" 
          md="6"
          class="agile-info-container"
          v-for="info in agileInfos"
          :key="info.type"
        >
          <h1 class="font-weight-bold mb-4">{{ info.text }}</h1>
          <ol>
            <li
              v-for="value in filterAgileItems(info.type)"
              :key="value.title"
            >
              {{ value.title }}
              <b-button 
                class="px-1"
                size="sm"
                variant="white"
                @click="editItem(value)"
              >
                <b-icon-pencil class="mb-1" font-scale=".9" variant="primary"></b-icon-pencil>
              </b-button>
              <b-button 
                class="px-1"
                size="sm"
                variant="white"
                @click="deleteItem(value)"
              >
                <b-icon-trash class="mb-1" font-scale=".9" variant="danger"></b-icon-trash>
              </b-button>
            </li>
          </ol>
          <b-button 
            class="mr-2 d-block mx-auto"
            @click="addItem(info.type)"
            variant="success"
          >Add a {{ info.type.slice(0,-1) }} </b-button>
        </b-col>
      </b-row>
    </b-container>
    
    <!-- Edit Dialog -->
    <edit-dialog :propItem="itemToEdit" @onTitleChange="updateItem"></edit-dialog>
    <add-dialog :type="addType"></add-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import FirebaseDataService from '../services/DataService';
import EditDialog from '@/components/EditDialog.vue';
import AddDialog from '@/components/AddDialog.vue';


export default Vue.extend({
  name: 'home',
  components: {
    EditDialog,
    AddDialog
  },
  data() {
    return {
      agileInfos: [
        {
          type: 'values',
          text: 'The 4 Values Of Agile Manifesto'
        },
        {
          type: 'principles',
          text: 'The 12 Agile Manifesto Principles'
        }
      ],
      agileItems: [],
      itemToEdit: {},
      itemToDelete: {},
      addType: ''
    }
  },
  methods: {
    addToDatabase() {
      console.log("Fake")
    },

    onDataChange(data: any) {
      let items = [] as any;
      data.forEach((item: any) => {
        let key = item.key;
        let data = item.val();
        items.push({
          key: key,
          title: data.title,
          type: data.type,
        });
      });
      this.agileItems = items;
    },

    filterAgileItems(type: string) {
      return this.agileItems.filter( item => item.type == type)
    },

    addItem(type: string) {
      this.addType = type
      this.$bvModal.show('add-modal')
    },

    editItem(item: {}) {
      this.itemToEdit = item
      setTimeout(() => {
        this.$bvModal.show('edit-modal');  
      }, 50);
    },

    updateItem(item: {}) {
      this.itemToEdit.title = item
    },

    deleteItem(item: {}) {
      this.$bvModal.msgBoxConfirm("Are you sure you want to delete this?")
        .then( (value: any) => {
          if (value === true) {
            FirebaseDataService.delete(item.key)
              .then(() => {
                this.$bvToast.toast('You have successfully deleted an item.', {
                  title: `Success!`,
                  variant: 'success',
                  solid: true,
                });
              })
              .catch((e: any) => {
                console.log(e);
              })
          }
        })
        .catch( e => {
          console.log(e);
        })
    }
  },
  mounted() {
    FirebaseDataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    FirebaseDataService.getAll().off("value", this.onDataChange);
  }
});
</script>
<style lang="scss">
.home {
  padding: 16px;

  .agile-info-container {
    margin-bottom: 24px;

    ol {
      padding-left: 16px;
    }
  }
}

@media screen and (min-width: 768px) {
  .home {
    padding: 24px;
  }
}
</style>
