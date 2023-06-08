import PropTypes from 'prop-types'
import React, { Component } from 'react'

const RED = 0;
const ORANGE = 1;
const GREEN = 2;


export default class MappingValueByClass extends Component {

    //immutability mutate: khả năng không thay đổi trạng thái bên trong
    // của obj nào đó
    //shalow copy : chỉ copy ở lv đầu tiên
    constructor() { // nếu truyền props thì gọi props ở constructor và super
        super(); //props
        // khởi tạo todo item là 1 arrays
        //this.todoItems = ['Mua bim bim', 'di da bong', 'di do xang']
        //state trong class react
        this.state = {
            currentColor: GREEN
        };
        this.inputElement = React.createRef();

        // method sẽ được gọi khi tạo ra element()
        //componentDidMount 

        // truyền biến this 
        this.onCustomClick = this.onCustomClick.bind(this);
        setInterval(() => {
            //  gọi kiểu vầy không thay đổi state
            this.state.currentColor = this.getNextColor(this.state.currentColor)
            //set state de render ui
            this.setState({
                currentColor: this.getNextColor(this.state.currentColor)
            })
        }, 1000)
    }
    getNextColor(color) {
        switch (color) {
            case RED:
                return ORANGE;
            case ORANGE:
                return GREEN;
            default:
                return RED;
        }

    }
    onCustomClick = () => {
        console.log('abc', this);
    }

    // muốn lấy props thì this.props.title ở component con
    render() {
        return (
            <div>
                {/* {this.todoItems.map((x) => <div>{x}</div>)} */}
                active : {this.state.currentColor}
                <div
                    ref={this.inputElement}
                    onClick={this.onCustomClick}
                    className='custom-onClick'>
                    abc
                </div>
            </div>
        )
    }
}
