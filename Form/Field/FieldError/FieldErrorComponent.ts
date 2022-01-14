import Component       from 'vue-class-component'
import FieldErrorProps from './FieldErrorProps'

@Component({
    name: 'FieldErrorComponent',
})
export default class FieldErrorComponent extends FieldErrorProps {
    field_error_errorMessage = this.errorMessage

    constructor() {
        super()
        this.field_error_errorMessage = this.errorMessage
    }
}
