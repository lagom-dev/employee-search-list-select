import { NAME_HTML_ELEMENT, ID_RESULT_LIST, NAME_NAME, NAME_ID, ID_NO_RESULTS_ALERT,ID_NO_ADDIDIONTAL_RESULTS_ALERT, ID_SHOW_MORE_BUTTON } from '../constants.js';
import Utils from '../Utils.js';
import List_item from './List_item.js';

export default class Result_list {

    constructor(_items, _selection_callback, _visible_props_array) {
        this.start = 0;
        this.items = _items;
        this.no_results_alert = document.getElementById(ID_NO_RESULTS_ALERT);
        this.no_additional_results_alert = document.getElementById(ID_NO_ADDIDIONTAL_RESULTS_ALERT);
        this.visible_props_array = _visible_props_array;
        this.show_more_button =  this.html_element = document.getElementById(ID_SHOW_MORE_BUTTON);
        this.html_element = document.getElementById(ID_RESULT_LIST);
        this.selection_callback = _selection_callback;
        this.bind_events();
        this.fill_results();
        
    }

    bind_events() {
        this.show_more_button.addEventListener('click',
            () => this.show_more());

    }

    show() {
        this.html_element.style.display = 'block';
        this.html_element.focus();
    }

    hide() {
        this.html_element.style.display = 'none';
    }

    toggle() {
        let display_state = this.html_element.style.display;
        if (display_state === 'none') {
            this.show();
        } else {
            this.hide();
        }
    }


    clear() {
        let tbody = this.html_element.tBodies[0];
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    show_more() {
        let items = [];
        if (this.start < this.items.length) {
            items = this.items.slice(this.start);
        }
        this.fill_results(items);
    }

    fill_results(_items) {
        if (!_items) {
            this.clear();
        }
        let items = _items || this.items;
        if (items.length) {
            this.no_results_alert.style.display = 'none';
            this.no_additional_results_alert.style.display = 'none';
            let i = 0;
            items.forEach(item => {
                if (i <= 1) {
                    let name = Utils.get_prop_value(item, NAME_NAME);
                    let list_item = new List_item(item, name, this.selection_callback, this.visible_props_array);
                    let html_list_item = Utils.get_prop_value(list_item, NAME_HTML_ELEMENT);
                    this.html_element.tBodies[0].append(html_list_item);
                   
                }
                i++;
            });
            this.start = this.start + 2;
            this.show_more_button.start = this.start;
        } else if(_items){
            Utils.fade_in( this.no_additional_results_alert);
            window.alert_timeout = setTimeout(() => {
                Utils.fade_out( this.no_additional_results_alert);
                clearTimeout(window.alert_timeout);
            }, 3000);
           
        } else {
            Utils.hide( this.no_additional_results_alert);
            Utils.show(this.no_results_alert);
        }

    }
}
