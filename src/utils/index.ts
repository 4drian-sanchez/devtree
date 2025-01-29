export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export const isValidUrl = ( url : string ) => {
    const regExp = /^https?:\/\/([^\s$.?#].[^\s]*)$/
    return regExp.test(url)
}