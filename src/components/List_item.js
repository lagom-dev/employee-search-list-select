import { NAME_LOGIN, NAME_ID } from '../constants.js';
import Utils from '../Utils.js';

export default class List_item {

    constructor(_content_array, _id, _click_callback) {
        this.content_array = _content_array;
        this.id = _id;
        this.click_callback = _click_callback;
        this.html_element = this.render_html(_click_callback);
    }

    selection_callback() {
        this.click_callback(this.id);
    }

    render_html( _click_callback) {
        let tr_element = document.createElement('tr');
        this.content_array.forEach((_cell_content)=>{
            let td_element = document.createElement('td');
            td_element.innerText = _cell_content;
            tr_element.append(td_element);
        });
     /*   let anchor_element = document.createElement('a');
        anchor_element.innerText = this.text;
        anchor_element.id = this.id;
        li_element.append(anchor_element);
        anchor_element.addEventListener('click', () => this.selection_callback());
        return li_element;*/
        return tr_element;
    }
}