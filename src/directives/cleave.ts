import { type Directive } from 'vue'
import Cleave from 'cleave.js'

const cleaveInstances = new WeakMap<HTMLElement, Cleave>()

const cleaveRegister:Directive = {
    mounted(el, binding) {
        const elInput = el.children[0]?.children[0] as HTMLInputElement;
        if(!elInput) {
            throw new Error('Cleave directive requires an input element as a child');
        }
        if(!binding.value) {
            return;
        }
        const cleaveInstance = new Cleave(elInput, binding.value)
        cleaveInstances.set(el, cleaveInstance)
    },
    updated(el, binding) {
        const elInput = el.children[0]?.children[0] as HTMLInputElement;
        if(!elInput) {
            throw new Error('Cleave directive requires an input element as a child');
        }
        if(!binding.value) {
            const existingInstance = cleaveInstances.get(el)
            if(existingInstance) {
                existingInstance.destroy()
                cleaveInstances.delete(el)
            }
            return;
        }
        const existingInstance = cleaveInstances.get(el)
        if(existingInstance) {
            existingInstance.destroy()
        }
        const cleaveInstance = new Cleave(elInput, binding.value)
        cleaveInstances.set(el, cleaveInstance)
    },
    unmounted(el) {
        const existingInstance = cleaveInstances.get(el)
        if(existingInstance) {
            existingInstance.destroy()
            cleaveInstances.delete(el)
        }
    },
}

export default cleaveRegister
