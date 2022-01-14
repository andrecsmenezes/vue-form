import Component           from 'vue-class-component'
import FieldProps          from './FieldProps'
import FieldErrorComponent from './FieldError/FieldErrorComponent'
import '@/directives/MaskDirective'
import { ValidationInterface } from '../interfaces/FieldObject'

@Component<FieldComponent>({
  name: 'FieldComponent',

  components: {
    'field-error': FieldErrorComponent,
  },

  watch: {
    errorMessage( newValue ){
      this.field_errorMessage = newValue
    },

    value( newValue ){
      this.field_value = newValue
      this.updateField( newValue )
    }
  }
})
export default class FieldComponent extends FieldProps {
  field_children     = this.children
  field_disabled     = this.disabled
  field_errorMessage = this.errorMessage
  field_id           = this.id
  field_inputClass   = this.inputClass
  field_label        = this.label       
  field_labelClass   = this.labelClass
  field_name         = this.name
  field_options      = this.options
  field_placeholder  = this.placeholder
  field_required     = this.required    
  field_size         = this.size
  field_type         = this.type
  field_value        = this.value
  field_validation   = this.validation

  constructor() {
    super()

    const randName: string = 'field-' + Math.random().toString( 32 ).substring( 2 )
    
    this.field_children     = this.children     || [] as never
    this.field_disabled     = this.disabled     || false
    this.field_errorMessage = this.errorMessage || false
    this.field_id           = this.id           || randName
    this.field_inputClass   = this.inputClass   || ''
    this.field_label        = this.label        || randName 
    this.field_labelClass   = this.labelClass   || randName
    this.field_name         = this.name         || randName
    this.field_options      = this.options      || [] as never
    this.field_placeholder  = this.placeholder  || false
    this.field_required     = this.required     || false
    this.field_size         = this.size         || 12
    this.field_type         = this.type         || 'text'
    this.field_value        = this.value        || ''
    this.field_validation   = this.validation   || {} as ValidationInterface
  }

  mounted() {
    this.field_value = this.value || ''
  }

  getMaskBasedOnFieldType( fieldType: string ): string | string[] | boolean {
    switch( fieldType ) {
      case 'cpf' :
        return [ '###.###.###-##' ]
      case 'date' :
        return [ '##/##/####' ]
      case 'phone' :
        return [ '(##) ####-####', '(##) #-####-####' ]
      case 'cep' :
        return [ '#####-###' ]
    }

    return false
  }

  getTagBasedOnFieldType( fieldType: string ): string {
    switch( fieldType ) {
      case 'textarea' :
      case 'select'   :
        return fieldType
    }

    return 'input'
  }

  getTypeBasedOnFieldType( fieldType: string ): string | boolean {
    switch( fieldType ) {
      case 'phone' :
        return 'tel'

      case 'select' :
        return false
    }

    return fieldType
  }

  updateField( value: string | number ): void {
    this.$emit( "update:field", value )
    this.updateForm()
  }

  updateForm(): void {
    this.$emit( "updateForm" )
  }
}
