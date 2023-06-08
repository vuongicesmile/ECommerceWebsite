import React, { useEffect, useRef, useState } from 'react'
import './model.scss'

function ModalCustom() {
    // modal cha
    const popuptMainRef = useRef();
    // modal con boc
    const popupRef = useRef();
    // chieu dai cua modal hien tai
    const refWidth = useRef(0);

    let [position, setPosition] = useState({
        x: 0,
        y: 0
    })
    let [position2, setPosition2] = useState({
        x: 0,
        y: 0
    })
    const onmouseDown = useRef(false);
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            if (onmouseDown.current) {
                popupRef.current.style.width = refWidth.current + 'px';
                popupRef.current.style.userSelect = 'none';
                //tao do popup (439,371)
                //toa do khi nhan enter (459,384)
                // console.log(position2);
                // console.log(position);
                // console.log('e.clientX', e.clientX);//337
                // console.log('e.clientY', e.clientY);//175
                // dùng để trừ thêm khi nhấn mouse enter
                popupRef.current.style.left = e.clientX - (position2.x - position.x) + 'px';
                popupRef.current.style.top = e.clientY - (position2.y - position.y) + 'px';
            }
        })
        window.removeEventListener('mousemove', (e) => {
            if (onmouseDown.current) {
                popupRef.current.style.width = refWidth.current + 'px';
                popupRef.current.style.userSelect = 'none';
                //tao do popup (439,371)
                //toa do khi nhan enter (459,384)
                // console.log(position2);
                // console.log(position);
                // console.log('e.clientX', e.clientX);//337
                // console.log('e.clientY', e.clientY);//175
                // dùng để trừ thêm khi nhấn mouse enter
                popupRef.current.style.left = e.clientX - (position2.x - position.x) + 'px';
                popupRef.current.style.top = e.clientY - (position2.y - position.y) + 'px';
            }
        })
        window.addEventListener('mouseup', (e) => {
            onmouseDown.current = false;
        });
        window.removeEventListener('mouseup', (e) => {
            onmouseDown.current = false;
        });
        popuptMainRef.current.addEventListener('mouseleave', (e) => {
            onmouseDown.current = false;
        });
        popuptMainRef.current.removeEventListener('mouseleave', (e) => {
            onmouseDown.current = false;
        });
    }, [])



    return (
        <div ref={popuptMainRef} className='modal-component'>
            <div
                ref={(el) => {
                    popupRef.current = el;
                }}
                style={{ width: '300px', height: '300px', position: 'absolute' }}
                className='modal-container'>

                <div
                    style={{ height: '80px' }}
                    className='header'
                    onMouseDown={(e) => {
                        //lấy chiều dài model hiện tại khi bấm chuột
                        refWidth.current = popupRef.current.offsetWidth;
                        // gắn vị trí trái và trên của thằng popup lên state
                        position.x = popupRef.current.getBoundingClientRect().left;
                        position.y = popupRef.current.getBoundingClientRect().top;
                        // gắn tạo độ x ,y khi bấm chuột enter 
                        position2.x = e.clientX;
                        position2.y = e.clientY;
                        // gan ref lai bang true
                        onmouseDown.current = true;


                    }}
                >
                    abcxyz
                </div>
            </div>
        </div>
    )
}

export default ModalCustom