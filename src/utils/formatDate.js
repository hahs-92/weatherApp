export const formatDate = (date) => {
    let dat = date.split('-').join(',')
    let newDate = new Date(dat).toDateString().split(' ')
    console.log("date ", dat)
    console.log("newdATE ", newDate)
    return `${ newDate[0] }, ${ newDate[2] } ${ newDate[1] }`
} 