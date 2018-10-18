import {ID_SEARCH_BOX, NAME_SEARCH, NAME_USERS, URL_GITHUB_API, JSON_PEOPLE} from '../constants.js';
import Utils from '../Utils.js';
import Result_list from './Result_list.js'


export default class Search_box {


    constructor(_selection_callback) {
        this.html_element = document.getElementById(ID_SEARCH_BOX);
        this.bind_events();
        this.search_box_time_out = 0;
        this.selection_callback = _selection_callback;
    }

    bind_events() {
        this.html_element.addEventListener('keydown',
            () => this.type_callback());

    }

    type_callback() {
        clearTimeout(this.search_box_time_out);
        this.search_box_time_out = setTimeout(() => this.delayed_type_callback(), 400);
    }

    delayed_type_callback() {
        let typed_value = Utils.get_prop_value(this.html_element, 'value');
        let normalized_value = Utils.normalize_string(typed_value);
        this.run_search(normalized_value);
    }


    make_search_url(_topic) {
        let search_url = URL_GITHUB_API + NAME_SEARCH + '/' + NAME_USERS + '?q=' + _topic;
        return search_url;
    }

    get_items(_json_items) {
        console.log(_json_items);
        let items = _json_items;
        let element_result_list = new Result_list(items, this.selection_callback);
        element_result_list.show();
    }


    run_search(typed_value) {
        let results = JSON_PEOPLE.filter(function (person) {
            return person.name.indexOf(typed_value) > -1 || person.email.indexOf(typed_value) > -1 || person.company.indexOf(typed_value) > -1 || person.address.indexOf(typed_value) > -1;
        });
        this.get_items(results);
    }

}