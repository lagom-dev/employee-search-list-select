import { NAME_ID, NAME_PICTURE, EMPLOYEE_IMAGE_ALT_TEXT, NAME_NAME } from '../constants.js';
import Utils from '../Utils.js';

export default class List_item {

    constructor(_item, _id, _click_callback, _visible_props_array) {
        this.item = _item;
        this.id = _id;
        this.visible_props_array = _visible_props_array;
        this.html_element = this.render_html(_click_callback);
        this.bind_events(_click_callback);
    }

    bind_events(_click_callback) {
        this.html_element.addEventListener('click',
            () => _click_callback(this.item));

    }

    render_html() {
        let tr_element = document.createElement('tr');
        this.visible_props_array.forEach(prop => {
            if (this.item.hasOwnProperty(prop)) {
                let td_element = document.createElement('td');
                td_element.className = prop;
                let cell_content = Utils.get_prop_value(this.item, prop);
                if(prop === NAME_PICTURE) {
                    let img_element = document.createElement('img');
                    img_element.src = cell_content;
                    let employee_name = Utils.get_prop_value(this.item, NAME_NAME);
                    let img_desc = EMPLOYEE_IMAGE_ALT_TEXT + ' ' + employee_name;
                    img_element.alt = img_desc;
                    img_element.longDesc = img_desc;
                    td_element.append(img_element);
                } else {
                    td_element.innerText = cell_content;
                }
                tr_element.append(td_element);
            }
        });     
        return tr_element;
    }
}