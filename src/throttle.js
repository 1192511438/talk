
 const throttle =function(fn,interval){
    let time =0                 //这种节流第一次不触发节流
    return function(){
        let currentTime=Date.now()
        if(currentTime-time>interval){
            fn.apply(this,arguments)
            time=currentTime
        }
    }
 }
//防抖
 const debounce=function(fn,interval){
    let time=null;
    return function () {
        if(time){
            clearTimeout(time)
        }                                 
        time=setTimeout(fn,interval)
    }
 }
//这种节流优化了第一次，但是最后一次还需要延迟执行
 const throttle1 =function(fn,interval){
    let time =null
    return function(){
            if(!time){
                time =setTimeout(()=>{
                    fn.apply(this,arguments)
                    time=null
                },interval)   
            }
        }
    }

    //终极版节流

    const throttle2=function (fn,interval) {
        let StartTime=null
        let time =null
        return function(){
            if(!StartTime)StartTime=Date.now()
            let currentTime=Date.now()
           
            if(currentTime-StartTime>=interval){
                fn.apply(this,arguments)
                StartTime=currentTime
                clearTimeout(time)
            }else{
                clearTimeout(time);
                time=setTimeout(()=>{
                    fn.apply(this,arguments)
                    StartTime=null
                },interval)
            }
        }
    }


    export {
        throttle2,
        debounce
    }