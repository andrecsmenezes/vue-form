import Vue, { PropType } from "vue";
import { FieldObject } from './interfaces/FieldObject'

const FormProps = Vue.extend({
    props: {
        fields: Object as PropType<{ [index: string]: FieldObject }>,

        saveButton: {
            default: true,
            type: Boolean,
        },

        saveButtonLabel: {
            default: "Salvar",
            type: String,
        },

        saveButtonClass: String,

        cancelButton: {
            default: true,
            type: Boolean,
        },

        cancelButtonLabel: {
            default: "Salvar",
            type: String,
        },

        cancelButtonClass: String,

        route: [ Array, Boolean, Number ],
    },
})

export default FormProps
