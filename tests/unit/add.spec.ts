import { mount, createLocalVue  } from '@vue/test-utils';
import AddDialog from '@/components/AddDialog.vue';

import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue)

describe('AddDialog.vue', () => {
  it('successfully adds an item to the database', async (done) => {
    const type = 'values';
    const wrapper = mount(AddDialog, {
      propsData: { type },
      localVue,
      data() {
        return {
          isAddSuccessful: false,
        }
      },
    });
    
    const modal = wrapper.find('#add-modal');

    const textInput = modal.find('input[type="text"]')
    await textInput.setValue('Test 123')

    const button = modal.find('button.btn-primary');
    button.trigger('click');


    await wrapper.vm.$nextTick();

    // @ts-ignore
    wrapper.vm.addItem().then( () => {
      expect(wrapper.emitted().success).toBeTruthy();
      done();
    });
  });
});
