import React, { useEffect, useRef } from "react";
import './index.less'
import { createPortal } from 'react-dom';
import { buttonList } from '@/components/Button';



function useOutsideAlerter(ref) {

}

const Drawer = ({ visible = false, onClose, title, style, children }) => {

    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!visible) return;
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClose();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, visible]);


    return createPortal(<div ref={wrapperRef} style={{ ...style, transform: `translateX(${visible ? 0 : '100vw'})` }} className="DrawerComponent">
        <div className="DrawerComponent-header">
            <buttonList.close onClick={() => { onClose ? onClose() : undefined }}></buttonList.close>
            <div style={{ wordBreak: 'break-all' }}>{title}</div>
        </div>
        {children}
    </div>, document.getElementById('root'))
}

export default Drawer
