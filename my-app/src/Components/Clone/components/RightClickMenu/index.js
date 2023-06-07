import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';
import './index.less';
function ClickMenu({ reff, position, listbutton, close,style }) {
  const closeMenu = useRef();

  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      if (
        closeMenu.current &&
        !closeMenu.current.contains(e.target) &&
        closeMenu.current.style.display != 'none'
      ) {
        closeMenu.current.style.display = 'none';
      }
    });
    window.removeEventListener('mousedown', (e) => {
      if (
        closeMenu.current &&
        !closeMenu.current.contains(e.target) &&
        closeMenu.current.style.display != 'none'
      ) {
        closeMenu.current.style.display = 'none';
      }
    });
  }, []);
  return (
    <>
      {position ? (
        createPortal(
          <div
            style={{
              ...style,
              display: 'none',
              transform: `translate(${position?.x}px,${position?.y}px)`,
            }}
            ref={(el) => {
              closeMenu.current = el;
              reff.current = el;
            }}
            className="clickmenu"
          >
            {listbutton.map((i, index) =>
              i.title ? (
                <div
                  className={i.disable == true || i.disable == null ? '' : 'disableMenu'}
                  style={{
                    display: 'flex',
                    gap: '5px',
                    borderBottom: i.endGroup ? '1px solid black' : '',
                    position: 'relative',
                  }}
                  key={index}
                  onClick={() => {
                    i.onClick?  i.onClick():undefined;
                    close ? close() : undefined;
                  }}
                >
                  {i.icon ? <img src={i.icon}></img> : undefined} <span>{i.title}</span>
                  <div className="clickmenuChildren">
                    {i.children
                      ? i.children.map((i, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              i.onClick();
                              close();
                            }}
                          >
                            {' '}
                            <span>{i.title}</span>
                          </div>
                        ))
                      : undefined}
                  </div>
                </div>
              ) : undefined,
            )}
            <></>
          </div>,
          document.getElementById('root'),
        )
      ) : (
        <div
          style={{
            display: 'none',
            top: '100%',
            right: '0',
            left: 'unset ',
          }}
          ref={(el) => {
            closeMenu.current = el;
            reff.current = el;
          }}
          className="clickmenu"
        >
          {listbutton.map((i, index) =>
            i.title ? (
              <div
                className={i.disable == true || i.disable == null ? '' : 'disableMenu'}
                style={{
                  display: 'flex',
                  gap: '5px',
                  borderBottom: i.endGroup ? '1px solid black' : '',
                  position: 'relative',
                }}
                key={index}
                onClick={() => {
                  i.onClick();
                  close();
                }}
              >
                {i.icon ? <img src={i.icon}></img> : undefined} <span>{i.title}</span>
                <div className="clickmenuChildren">
                  {i.children
                    ? i.children.map((j, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            j.onClick();
                            close();
                          }}
                        >
                          <span>{j.title}</span>
                        </div>
                      ))
                    : undefined}
                </div>
              </div>
            ) : undefined,
          )}
          <></>
        </div>
      )}
    </>
  );
}

const onOpenMenu=(refCLickmenu,refCLickmenu2)=>{
  if( refCLickmenu.current.style.display =='flex')
          {
            refCLickmenu.current.style.display ='none'
          }
          else{
            let a=0;
            let b=0;
       
          refCLickmenu.current.style.display = 'flex'; 
          b=window.innerWidth-refCLickmenu2.current.scrollWidth-refCLickmenu2.current.getBoundingClientRect().x-refCLickmenu2.current.scrollWidth
   
          if( window.innerHeight-refCLickmenu2.current.getBoundingClientRect().y-refCLickmenu.current.scrollHeight<0)
          {
              a=refCLickmenu2.current.getBoundingClientRect().y+(window.innerHeight-refCLickmenu2.current.getBoundingClientRect().y-refCLickmenu.current.scrollHeight)
          }
          else{
              a=refCLickmenu2.current.getBoundingClientRect().y
          }
          refCLickmenu.current.style.transform=`translate(${refCLickmenu2.current.getBoundingClientRect().left + (b<0?-refCLickmenu.current.offsetWidth:refCLickmenu2.current.offsetWidth)}px,${a}px)`
          
          }
}
export default ClickMenu;
export {onOpenMenu}
