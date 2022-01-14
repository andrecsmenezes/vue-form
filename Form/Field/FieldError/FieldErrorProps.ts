import Vue from 'vue'

const FieldErrorProps = Vue.extend({
    props: {
        errorMessage: {
            type: String,
            required: true
        }
    },
})

export default FieldErrorProps
