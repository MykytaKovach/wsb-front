const fullDate =(date)=>{
    
    const d = new Date(date)
    
    return [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
    
       [(d.getHours()>9 ? '' : '0') + d.getHours(),
        (d.getMinutes()>9?'':'0')+d.getMinutes()].join(':');
}

export default fullDate