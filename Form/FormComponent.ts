import Component from "vue-class-component"
import Field from "./Field/FieldComponent"
import FormProps from "./FormProps"
import { Validator, ValidatorMessage } from "../validator"
import { FieldObject } from "./interfaces/FieldObject"
import { isUndefined } from "lodash"

@Component<Form>({
    name: "Form",
    
    components: {
        Field,
    },

    watch: {
        valid: function( newValue: boolean ): void{
            this._valid = newValue
        },

        fields: {
            handler( newValue ) {
                this.form_fields = newValue
            },

            deep: true
        }
    }
})
export default class Form extends FormProps {    
    form_fields            = this.fields
    form_saveButton        = this.saveButton
    form_saveButtonLabel   = this.saveButtonLabel
    form_saveButtonClass   = this.saveButtonClass
    form_cancelButton      = this.cancelButton
    form_cancelButtonLabel = this.cancelButtonLabel
    form_cancelButtonClass = this.cancelButtonClass
    form_route             = this.route
    form_mountComponent    = false
    
    private _valid = false

    constructor() {
        super()

        this.form_fields            = this.fields
        this.form_saveButton        = this.saveButton
        this.form_saveButtonLabel   = this.saveButtonLabel
        this.form_saveButtonClass   = this.saveButtonClass
        this.form_cancelButton      = this.cancelButton
        this.form_cancelButtonLabel = this.cancelButtonLabel
        this.form_cancelButtonClass = this.cancelButtonClass
        this.form_route             = this.route
    }

    mounted() {
        setTimeout( () => {
            this.form_fields            = this.fields
            this.form_saveButton        = this.saveButton
            this.form_saveButtonLabel   = this.saveButtonLabel
            this.form_saveButtonClass   = this.saveButtonClass
            this.form_cancelButton      = this.cancelButton
            this.form_cancelButtonLabel = this.cancelButtonLabel
            this.form_cancelButtonClass = this.cancelButtonClass
            this.form_route             = this.route    
            this.form_mountComponent    = true
        }, 100)
    }

    updateForm(): void {
        this.$emit( "updateForm", this.getData() )
        this.validate()
    }

    onClickSave(route: string): void {
        this.$emit( "clickSave", route )
    }

    onClickCancel(route: string): void {
        this.$emit( "clickCancel", route )
    }

    validate( list?: { [ index: string ]: FieldObject } | undefined ): boolean {
        if( isUndefined( list ) ) this._valid = true

        Object.values( list || this.form_fields )
            .forEach( (field: FieldObject) => {
                field.errorMessage = false
                
                if ( field.validation ) {
                    for( const [ validation, parameters ] of Object.entries( field.validation ) ) {
                        if( Validator.run( field.value, validation, parameters ) === false ){
                            this._valid = false
                            field.errorMessage = ValidatorMessage[ validation ]
                            return
                        }
                    }
                }

                if ( field.children ) this.validate( field.children )
            })

        this.$emit( 'isValid', this._valid )

        return this._valid
    }

    getData( list?: { [ index: string ]: FieldObject } ): { [key: string]: any } {
        const data: { [key: string]: any } = {}

        Object.entries( list || this.form_fields ).map( ( field, fieldKey ) => {
            const [ keyField, dataField ]   = field
            const { name, value, children } = dataField

            if( value )
                data[ name || keyField ] = value

            if( children )
                data[ name || keyField ][ fieldKey ] = this.getData( children )
        })

        return data
    }

    get valid(): boolean {
        return this._valid
    }

    set valid( value: boolean ) {
        this._valid = value
    }
}
