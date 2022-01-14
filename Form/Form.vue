<template>
  <form v-if="cx_mountComponent">
    <field 
      v-for              ="(field, index) in cx_fields" 
      v-bind:field.sync  ="cx_fields[index].value"
      :key               ="index"
      
      :children.sync     = cx_fields[index].children
      :disabled.sync     = cx_fields[index].disabled
      :errorMessage.sync = cx_fields[index].errorMessage
      :id.sync           = cx_fields[index].id
      :inputClass.sync   = cx_fields[index].inputClass
      :label.sync        = cx_fields[index].label
      :labelClass.sync   = cx_fields[index].labelClass
      :name.sync         = cx_fields[index].name
      :options.sync      = cx_fields[index].options
      :placeholder.sync  = cx_fields[index].placeholder
      :required.sync     = cx_fields[index].required
      :size.sync         = cx_fields[index].size
      :type.sync         = cx_fields[index].type
      :value.sync        = cx_fields[index].value
      :validation.sync   = cx_fields[index].validation
      
      @updateForm        ="updateForm"
    />
  </form>
</template>

<script lang="ts">
import FormComponent from './FormComponent'
export default FormComponent
</script>

<style lang="scss" scoped></style>
