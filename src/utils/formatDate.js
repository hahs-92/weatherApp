export const formatDate = (date) => {
    let dat = date.split('-').join(',')
    let newDate = new Date(dat).toDateString().split(' ')
    return `${ newDate[0] }, ${ newDate[2] } ${ newDate[1] }`
} 