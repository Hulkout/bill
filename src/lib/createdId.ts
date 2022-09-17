let id:number = parseInt(window.localStorage.getItem('_idMax')|| '0') || 0
//window.localStorage.getItem 得到的是字符串 变为整数 0是保底值
function createId(){
    id++
    //最大值存储进去
    window.localStorage.setItem('_idMax',id.toString())
    return id
}

export default createId