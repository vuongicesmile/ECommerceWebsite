import { buttonList } from '../Button';
import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import './index.less';
const GroupButton = ({ item, edit }) => {
  const ref = useRef([]);
  const ref2 = useRef();
  const drop = useRef();
  const [arr, setArr] = useState([]);
  const onMouseUp = () => {
    if (arr) {
      let a = [...arr];

      for (let i = 0; i < ref.current.length; i++) {
        if (
          ref.current[i].getBoundingClientRect().right +
            12 -
            ref2.current.getBoundingClientRect().right >
          0
        ) {
          ref.current[i].classList.add('classHidden');
          a[i].status = false;
        } else {
          ref.current[i].classList.remove('classHidden');
          a[i].status = true;
        }

        setArr(a);
      }

      drop.current ? (drop.current.style.display = 'flex') : undefined;
    }
  };

  const closeDrop = () => {
    drop.current ? (drop.current.style.display = 'none') : undefined;
  };
  const resize = () => {
    if (arr && ref.current && ref2.current) {
      for (let i = 0; i < ref.current.length; i++) {
        if (
          ref.current[i].getBoundingClientRect().right +
            12 -
            ref2.current.getBoundingClientRect().right >
          0
        ) {
          ref.current[i].classList.add('classHidden');
        } else {
          ref.current[i].classList.remove('classHidden');
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      resize();
    });

    window.removeEventListener('resize', () => {
      resize();
    });

    setArr(item);
  }, []);
  return (
    <div
      className={`groupbuttonComponent-container ${edit == 2 || edit == 1 ? 'readonlyGroup' : ''}`}
    >
      <div ref={ref2} className="groupbuttonComponent">
        {arr.map((i, index) => (
          <span
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            key={index}
            ref={(el) => (ref.current[index] = el)}
          >
            {i.bt}
          </span>
        ))}
      </div>
      <div
        className="showMore"
        onMouseLeave={closeDrop}
        onClick={() => {
          onMouseUp();
        }}
      >
        More
        <div ref={drop} className={`showMore-drop`}>
          {arr
            .filter((i) => i.status == false)
            .map((i, index) => (
              <span key={index}>{i.bt}</span>
            ))}
        </div>
      </div>
    </div>
  );
};
export { GroupButton };
