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
 * Depois da implementação do i18n,
 * implementar o método de tradução
 */
const ValidatorMessage: Record<string, string> = {
    alpha          : 'O campo aceita apenas letras',
    alphaNum       : 'O campo aceita apenas letras e números',
    and            : 'Campo inválido',
    between        : 'O campo deve estar entre {{ min }} e {{ max }}',
    cep            : 'O campo aceita apenas CEP válidos',
    cnpj           : 'O campo aceita apenas CNPJ válidos',
    cpf            : 'O campo aceita apenas CPF válidos',
    date           : 'O campo aceita apenas datas válidas',
    decimal        : 'O campo aceita apenas números decimais',
    email          : 'O campo aceita apenas e-mails válidos',
    integer        : 'O campo aceita apenas números inteiros',
    ipv4Private    : 'O campo aceita apenas IPs privados válidos',
    ipv4Public     : 'O campo aceita apenas IPs públicos válidos',
    ipv4           : 'O campo aceita apenas IPs válidos',
    ipv6           : 'O campo aceita apenas IPs válidos',
    ip             : 'O campo aceita apenas IPs válidos',
    mac            : 'O campo aceita apenas MACs válidos',
    maxLength      : 'O campo deve ter no máximo {{ max }} caracteres',
    maxValue       : 'O campo deve ter no máximo {{ max }}',
    minLength      : 'O campo deve ter no mínimo {{ min }} caracteres',
    minValue       : 'O campo deve ter no mínimo {{ min }}',
    not            : 'O campo não deve ser igual a {{ value }}',
    numeric        : 'O campo aceita apenas números',
    or             : 'Campo inválido',
    phone          : 'O campo aceita apenas telefones válidos',
    regex          : 'O campo aceita apenas valores válidos',
    required       : '',
    requiredIf     : 'O campo precisa ser preenchido',
    requiredUnless : 'O campo precisa ser preenchido',
    sameAs         : 'O campo deve ser igual a {{ value }}',
    time           : 'O campo aceita apenas horas válidas',
    time12         : 'O campo aceita apenas horas válidas',
    time24         : 'O campo aceita apenas horas válidas',
    url            : 'O campo aceita apenas URLs válidas',
    uuid           : 'O campo aceita apenas UUIDs válidos',
    default        : 'Campo inválido',
}

export { Validator, ValidatorMessage }
