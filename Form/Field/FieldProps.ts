import Vue from 'vue'
import { FieldObject, ValidationInterface } from '../interfaces/FieldObject'

const FieldProps = Vue.extend({
    props: {
        type         : String,
        id           : String,
        name         : String,
        label        : String,
        labelClass   : String,
        inputClass   : String,
        placeholder  : [ String, Boolean ],
        value        : [ String, Number ],
        required     : Boolean,
        size         : Number,
        errorMessage : [ String, Boolean ],
        disabled     : Boolean,
        options      : Object as () => { [ key in string ]: string },
        children     : Object as () => { [ key in string | number ]: FieldObject },
        validation   : Object as () => ValidationInterface
    }
})

export default FieldProps
