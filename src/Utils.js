import { NAME_VALUE } from './constants.js';

export default class Utils {

    static get_prop_value(_object, _prop_name) {
        let prop_value;
        try {
            if (this.is_valid_value(_object) && this.is_valid_value(_prop_name)) {
                prop_value = _object[_prop_name];
            }
        } catch (error) {
            console.log(error);
        }
        return prop_value;
    }

    static is_valid_value(_value) {
        let value = false;
        if (typeof _value != 'undefined' && _value != null && _value != '') {
            value = _value || false;
        } else {
            let caller = arguments ? arguments.callee.caller.name : 'strict';
            console.log('value is not valid: ', _value, 'caller: ', caller);
            console.log('value is not valid: ', _value);
        }
        return value;
    }


    static normalize_string(_typed_value) {
        if (this.is_valid_value(_typed_value)) {
            let typed_value = JSON.stringify(_typed_value);
            let white_space_regex = /\s/g;
            let special_char_regex = /[^\w\s]/gi;
            let trimmed_value = typed_value.replace(white_space_regex, '');
            let normalized_value = trimmed_value.replace(special_char_regex, '');
            return normalized_value;
        } else {
            // let caller = arguments.callee.caller.name;
            console.log('value is not valid: ', _typed_value);
        }
    }

    static set_field_values(json_data, _html_id_selector) {
        let json_props = Object.keys(json_data);
        let content = document.getElementById(_html_id_selector);
        json_props.forEach(prop => {
            var field = content.getElementsByClassName(prop)[0];
            if (field) {
                let value = Utils.get_prop_value(json_data, prop);
                let tag_name = Utils.get_prop_value(field, 'tagName');
                if (tag_name === 'IMG') {
                    field.src = value;
                } else {
                    field.innerHTML = value || 'N/A';
                }
            }
        });
    }

    static clear_field_values(_content_id_selector) {
        let content = document.getElementById(_content_id_selector);
        let value_fields = content.getElementsByClassName(NAME_VALUE);
        value_fields.forEach(field => {
            if (field && fied) {
                let tag_name = Utils.get_prop_value(field, 'tagName');
                if (tag_name === 'img') {
                    field.src = '';
                } else {
                    field.innerHTML = '';
                }
            }
        });
    }


    static compare(a, b, prop) {
        if (a.prop < b.prop)
            return -1;
        if (a.prop > b.prop)
            return 1;
        return 0;
    }

    static getMap(_lat, _long, _address, _title, _map_element_id) {

        let map = new Microsoft.Maps.Map(document.getElementById(_map_element_id), {
            center: new Microsoft.Maps.Location(_lat, _long)
        });
        let map_center = map.getCenter();
        let loc_info = new Microsoft.Maps.Infobox(map_center, {
            title: _title,
            description: _address,
        });
        loc_info.setMap(map);
    }

    static show(_element){
        _element.style.display = 'block';
    }

    static hide(_element){
        _element.style.display = 'none';
    }

    static fade_out(_element) {
        var op = 1;  
        var timer = setInterval( () => {
            if (op <= 0.1){
                clearInterval(timer);
                _element.style.display = 'none';
            }
            _element.style.opacity = op;
            _element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    static fade_in(_element) {
        var op = 0.1; 
        _element.style.display = 'block';
        var timer = setInterval( () =>{
            if (op >= 1){
                clearInterval(timer);
            }
            _element.style.opacity = op;
            _element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }
}


