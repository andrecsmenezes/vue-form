import { FieldObject } from "./FieldObject";

export interface FormObject {
    fields             : { [ index in string | number ]: FieldObject },
    saveButton        ?: Object,
    saveButtonLabel   ?: Object,
    saveButtonClass   ?: String,
    cancelButton      ?: Object,
    cancelButtonLabel ?: Object,
    cancelButtonClass ?: String,
    route              : unknown[] | Boolean | Number,
}
