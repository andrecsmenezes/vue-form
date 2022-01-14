<template>
    <div 
        class="col" 
        :class="{ 
            [`col-md-${cx_size}`]: cx_size && cx_size < 12 
        }"
    >
        <label
            v-if   ="cx_label"
            :for   ="cx_name"
            :class ="{ [cx_labelClass]: cx_labelClass, 'error': cx_errorMessage }"
            class  ="form-label"
        >
            {{ cx_label | toRequired( cx_validation && cx_validation.required ) }}
        </label>

        <slot>
            <component
                :autocomplete ="cx_name"
                :class        ="{ [ cx_inputClass ]: cx_inputClass, 'error': cx_errorMessage }"
                :disabled     ="cx_disabled"
                :id           ="cx_id"
                :is           ="getTagBasedOnFieldType( cx_type )"
                :name         ="cx_name"
                :placeholder  ="cx_placeholder"
                :ref          ="cx_name"
                :type         ="getTypeBasedOnFieldType( cx_type )"
                :value        ="cx_value"
                
                v-cx-mask     ="getMaskBasedOnFieldType( cx_type )"
                
                @input        ="updateField( $event.target.value )"
                
                class         ="form-control"
            >
                <template v-if="cx_type === 'select' && cx_options">
                    <option 
                        v-if     ="cx_placeholder"
                        value    ="" 
                        disabled ="disabled"
                        :selected ="cx_value ? false : 'selected'"
                    >
                        {{ cx_placeholder }}
                    </option>
                    
                    <option 
                        :key   ="value" 
                        :value ="value"
                        v-for  ="(label, value) in cx_options"
                    >
                        {{ label }}
                    </option>
                </template>
            </component>
        </slot>

        <template v-if="cx_errorMessage">
            <field-error v-bind:errorMessage.sync="cx_errorMessage" />
        </template>

        <div v-if="cx_children">
            <FieldComponent 
                v-for                    ="(field, index) in cx_children" 
                :key                     ="index"
                
                v-bind:children.sync     ="cx_children[index].children"
                v-bind:disabled.sync     ="cx_children[index].disabled"
                v-bind:errorMessage.sync ="cx_children[index].errorMessage"
                v-bind:id.sync           ="cx_children[index].id"
                v-bind:inputClass.sync   ="cx_children[index].inputClass"
                v-bind:label.sync        ="cx_children[index].label"
                v-bind:labelClass.sync   ="cx_children[index].labelClass"
                v-bind:name.sync         ="cx_children[index].name"
                v-bind:options.sync      ="cx_children[index].options"
                v-bind:placeholder.sync  ="cx_children[index].placeholder"
                v-bind:required.sync     ="cx_children[index].required"
                v-bind:size.sync         ="cx_children[index].size"
                v-bind:type.sync         ="cx_children[index].type"
                v-bind:value.sync        ="cx_children[index].value"

                v-bind:field.sync        ="cx_children[index].value"
                
                @updateForm              ="updateForm"
            />
        </div>
    </div>
</template>

<script lang="ts">
import FieldComponent from './FieldComponent'
export default FieldComponent
</script>

<style lang="scss" scoped>
</style>
