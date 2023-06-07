import React,{useRef} from "react";
import './index.less'
import { createPortal } from 'react-dom';


const onMouseMoveWidthRef=(ref1,ref2,open=false,event)=>{

    if(ref1&&ref2)
    {  
        if(open)
        { ref2.style.display='flex'
      
            let a=ref1.getBoundingClientRect(); 
            let b=window.innerHeight-a.top-ref2.offsetHeight
            ref2.style.transform=`translate(${b<0?a.left+ref1.offsetWidth+10:a.left}px , ${b>0?a.top+ref1.offsetHeight:a.top+b}px)`
            event ?event():undefined
          
        }
        else{
           
            ref2.style.display='none'
            
        }
    }
  
    }
   
  


const onMouseMove=(parent,aa,open=true,ref1,ref2)=>{
    let child=document.querySelector('.'+aa)
    
        if(child)
        {   
            if(open)
            { child.style.display='revert'
              
                let a=parent.getBoundingClientRect(); 
                let b=window.innerHeight-a.top-child.offsetHeight
                child.style.transform=`translate(${a.left+parent.offsetWidth+10}px , ${b>0?a.top:a.top+b}px)`
               
              
            }
            else{
                let a=parent.getBoundingClientRect();
                child.style.display='none'
                
            }
            
        }
    
   
  

}

const Note=({children,className})=>{

    return createPortal(
<div className={`note-component `+className}>{children}</div>
        , document.getElementById('root')
    ) 
}
export {onMouseMove,onMouseMoveWidthRef}
export default Note
