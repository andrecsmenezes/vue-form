import { VueConstructor } from 'vue'

const toRequired = ( value:string, required: boolean ) => {
    return value + ( required ? '*' : '' )
}

export default {
    install( Vue: VueConstructor ) {
        Vue.filter( 'toRequired', toRequired )
    }
}
