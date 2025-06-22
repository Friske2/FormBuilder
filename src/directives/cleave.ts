import { type Directive } from 'vue'
import Cleave from 'cleave.js'
const cleaveRegister:Directive = {
    updated(el, binding) {
        const elInput = el.children[0].children[0] as HTMLInputElement;
         if(!elInput) {
            throw new Error('Cleave directive requires an input element as a child');
         }
        //  console.log('cleave directive updated', el, binding);
         if(!binding.value) {
            // throw new Error('Cleave directive requires a binding value');
            return;
        }
        new Cleave(elInput, binding.value)
    },
}

export default cleaveRegister
