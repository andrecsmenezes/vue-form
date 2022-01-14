import Vue, { DirectiveOptions } from 'vue'
import { mask } from 'vue-the-mask'

const MaskDirective: DirectiveOptions = {
    bind: function ( el, binding, vnode, oldVnode ) {
        if( 
                el.tagName.toLowerCase() === 'input'
            &&  [ 'text', 'tel' ].includes ( ( el.getAttribute( 'type' ) as string ).toLowerCase() )
            &&  binding.value
        ) {
            mask( el, binding, vnode, oldVnode )
        }
    }
}

Vue.directive( 'custom-mask', MaskDirective )
