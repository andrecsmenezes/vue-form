import { isArray, isDate, isInteger, isNumber, isString } from "lodash"

class Validator {
    static alpha( value: string ): boolean { 
        return isString( value ) && /^[a-zA-Z]+$/.test( value )
    }
    
    static alphaNum( value: string ): boolean { 
        return isString( value ) && /^[a-zA-Z0-9]+$/.test( value )
    }
    
    static and( value: string, condition: [ string, ...any ] ): boolean { 
        return condition.filter( item => {
            const [ method, ...args ] = item
            return method( value, ...args )
        }).length === condition.length
    }
    
    static between( value: string, compare: any[] ): boolean { 
        return isNumber( value ) && value >= compare[ 0 ] && value <= compare[ 1 ]
    }
    
    static cep( value: string ): boolean { 
        return /^\d{5}-?\d{3}$/.test( value )
    }
    
    static cnpj( value: string ): boolean { 
        return      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test( value )
                ||  /^\d{14}$/.test( value )
    }
    
    static cpf( value: string ): boolean {
        return      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test( value )
                ||  /^\d{11}$/.test( value )
    }
    
    static date( value: string ): boolean { 
        return      /^\d{4}-\d{2}-\d{2}$/.test( value )
                &&  isDate( new Date( value ) )
                &&  ( new Date( value ) ).getFullYear() >  ( new Date() ).getFullYear() - 100
                &&  ( new Date( value ) ).getFullYear() <= ( new Date() ).getFullYear()
    }
    
    static decimal( value: string ): boolean { 
        return !isNaN( parseFloat( value ) )
    }
    
    static email( value: string ): boolean { 
        return /^[a-z0-9][a-z0-9_\-.+]*[a-z0-9]@([a-z0-9][a-z0-9_\-+]*[a-z0-9])(\.[a-z0-9][a-z0-9_\-+]*[a-z0-9]){1,3}/.test( value )
    }
    
    static integer( value: string ): boolean { 
        return isInteger( value )
    }
    
    static ipv4Private( value: string ): boolean {
        return /^(10(\.([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])){3})|172\.(1[6-9]|2[0-9]|3[01])(\.([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])){2}|192\.168(\.([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])){2}|169\.254(\.([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])){2}$/.test( value )
    }

    static ipv4Public( value: string ): boolean {
        return /^([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])(\.([0-9]{1,2}|1[0-9]{2}|2[01234][0-9]|25[0-5])){3}$/.test( value )
    }

    static ipv4( value: string ): boolean { 
        return Validator.ipv4Private( value ) || Validator.ipv4Public( value )
    }
    
    static ipv6( value: string ): boolean { 
        return /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i.test( value )
    }

    static ip( value: string ): boolean { 
        return Validator.ipv4( value ) || Validator.ipv6( value )
    }
    
    static mac( value: string ): boolean { 
        return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test( value )
    }
    
    static maxLength( value: string, length: number ): boolean { 
        return isString( value ) && value.length <= length
    }
    
    static maxValue( value: string, maxValue: number ): boolean { 
        return Validator.numeric( value ) && parseFloat( value ) <= maxValue
    }
    
    static minLength( value: string, length: number ): boolean { 
        return isString( value ) && value.length >= length
    }
    
    static minValue( value: number, minValue: number ): boolean { 
        return isNumber( value ) && value >= minValue
    }
    
    static not( value: string, condition: any | [ string, ...any ], ...args: any ): boolean { 
        if( isArray( condition ) ) {
            return condition.filter( item => {
                const [ method, ...args ] = item
                return method( value, ...args )
            }).length === 0
        }

        return !condition( value, ...args )
    }
    
    static numeric( value: string ): boolean { 
        return isNumber( value )
    }
    
    static or( value: string, condition: [ string, ...any ] ): boolean { 
        return condition.filter( item => {
            const [ method, ...args ] = item
            return method( value, ...args )
        }).length > 0
    }
    
    static phone( value: string ): boolean { 
        return      isString( value ) 
                &&  /^\d{10,11}$/.test( value.replace( /\D/g, '' ) )
    }
    
    static regex( value: string, modificator?: string ): boolean { 
        return new RegExp( value, modificator ).test( value ) 
    }
    
    static required( value: string ): boolean { 
        return isString( value ) && value.length > 0
    }
    
    // TODO: Implement
    static requiredIf( value: string, condition: any | any[] ): boolean { return false }
    
    // TODO: Implement
    static requiredUnless( value: string, condition: any | any[] ): boolean { return false }
    
    static sameAs( value: string, compare: any ): boolean { 
        return value === compare
    }
    
    // TODO: Implement
    static time( value: string ): boolean { return false }
    
    // TODO: Implement
    static time12( value: string ): boolean { return false }
    
    // TODO: Implement
    static time24( value: string ): boolean { return false }
    
    static url( value: string ): boolean { 
        return /^((?<scheme>(https?|ftp|tel|mailto)):)?(\/\/)?((?<user>[a-z0-9_-]+):(?<password>[^@\n]+)@)?(?<host>(www\.)?[a-z][a-z0-9-_]+(\.[a-z][a-z0-9-_]+){1,})(:(?<port>[0-9]+))?(?<path>(\/[^/\n?#]*)*)(\?(?<query>[^#\n]*))?(#(?<fragment>.*))?$/.test( value )
    }
    
    static uuid( value: string ): boolean { 
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test( value )
    }

    static run( value: any, method: string, params: any ): boolean {
        switch( method.toLowerCase() ) {
            case 'alpha'          : return Validator.alpha( value )
            case 'alphaNum'       : return Validator.alphaNum( value )
            case 'and'            : return Validator.and( value, params )
            case 'between'        : return Validator.between( value, params )
            case 'cep'            : return Validator.cep( value )
            case 'cnpj'           : return Validator.cnpj( value )
            case 'cpf'            : return Validator.cpf( value )
            case 'date'           : return Validator.date( value )
            case 'decimal'        : return Validator.decimal( value )
            case 'email'          : return Validator.email( value )
            case 'integer'        : return Validator.integer( value )
            case 'ipv4Private'    : return Validator.ipv4Private( value )
            case 'ipv4Public'     : return Validator.ipv4Public( value )
            case 'ipv4'           : return Validator.ipv4( value )
            case 'ipv6'           : return Validator.ipv6( value )
            case 'ip'             : return Validator.ip( value )
            case 'mac'            : return Validator.mac( value )
            case 'maxLength'      : return Validator.maxLength( value, params )
            case 'maxValue'       : return Validator.maxValue( value, params )
            case 'minLength'      : return Validator.minLength( value, params )
            case 'minValue'       : return Validator.minValue( value, params )
            case 'not'            : return Validator.not( value, params )
            case 'numeric'        : return Validator.numeric( value )
            case 'or'             : return Validator.or( value, params )
            case 'phone'          : return Validator.phone( value )
            case 'regex'          : return Validator.regex( value )
            case 'required'       : return Validator.required( value )
            case 'requiredIf'     : return Validator.requiredIf( value, params )
            case 'requiredUnless' : return Validator.requiredUnless( value, params )
            case 'sameAs'         : return Validator.sameAs( value, params )
            case 'time'           : return Validator.time( value )
            case 'time12'         : return Validator.time12( value )
            case 'time24'         : return Validator.time24( value )
            case 'url'            : return Validator.url( value )
            case 'uuid'           : return Validator.uuid( value )
        }

        return false
    }
}

/**
 * Depois da implementa????o do i18n,
 * implementar o m??todo de tradu????o
 */
const ValidatorMessage: Record<string, string> = {
    alpha          : 'O campo aceita apenas letras',
    alphaNum       : 'O campo aceita apenas letras e n??meros',
    and            : 'Campo inv??lido',
    between        : 'O campo deve estar entre {{ min }} e {{ max }}',
    cep            : 'O campo aceita apenas CEP v??lidos',
    cnpj           : 'O campo aceita apenas CNPJ v??lidos',
    cpf            : 'O campo aceita apenas CPF v??lidos',
    date           : 'O campo aceita apenas datas v??lidas',
    decimal        : 'O campo aceita apenas n??meros decimais',
    email          : 'O campo aceita apenas e-mails v??lidos',
    integer        : 'O campo aceita apenas n??meros inteiros',
    ipv4Private    : 'O campo aceita apenas IPs privados v??lidos',
    ipv4Public     : 'O campo aceita apenas IPs p??blicos v??lidos',
    ipv4           : 'O campo aceita apenas IPs v??lidos',
    ipv6           : 'O campo aceita apenas IPs v??lidos',
    ip             : 'O campo aceita apenas IPs v??lidos',
    mac            : 'O campo aceita apenas MACs v??lidos',
    maxLength      : 'O campo deve ter no m??ximo {{ max }} caracteres',
    maxValue       : 'O campo deve ter no m??ximo {{ max }}',
    minLength      : 'O campo deve ter no m??nimo {{ min }} caracteres',
    minValue       : 'O campo deve ter no m??nimo {{ min }}',
    not            : 'O campo n??o deve ser igual a {{ value }}',
    numeric        : 'O campo aceita apenas n??meros',
    or             : 'Campo inv??lido',
    phone          : 'O campo aceita apenas telefones v??lidos',
    regex          : 'O campo aceita apenas valores v??lidos',
    required       : '',
    requiredIf     : 'O campo precisa ser preenchido',
    requiredUnless : 'O campo precisa ser preenchido',
    sameAs         : 'O campo deve ser igual a {{ value }}',
    time           : 'O campo aceita apenas horas v??lidas',
    time12         : 'O campo aceita apenas horas v??lidas',
    time24         : 'O campo aceita apenas horas v??lidas',
    url            : 'O campo aceita apenas URLs v??lidas',
    uuid           : 'O campo aceita apenas UUIDs v??lidos',
    default        : 'Campo inv??lido',
}

export { Validator, ValidatorMessage }
