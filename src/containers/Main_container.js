import Utils from '../Utils.js';
import Search_box from '../components/Search_box.js';
import { NAME_ID, ID_CONTAINER_USER_INFO, NAME_SEARCH, NAME_LONGITUDE, NAME_LATITUDE, ID_EMPLOYEE_MAP, NAME_ADDRESS, TITLE_EMPLOYEE_LOCATION } from '../constants.js';

export default class Main_container {

    constructor() {
        let search_box = new Search_box(this.load_employee_content);
        this.container_user_info = document.getElementById(ID_CONTAINER_USER_INFO);
    }

    show_employee_info() {
        main_container.container_user_info.scrollIntoView();
    }

    load_employee_content(_employee) {
        let employee = _employee;
        if (employee) {
            Utils.set_field_values(employee, ID_CONTAINER_USER_INFO);
            let employee_lat = Utils.get_prop_value(employee, NAME_LATITUDE);
            let employee_long = Utils.get_prop_value(employee, NAME_LONGITUDE);
            let employee_address = Utils.get_prop_value(employee, NAME_ADDRESS);
           
            main_container.show_employee_info();
            Utils.getMap(employee_lat, employee_long, employee_address, TITLE_EMPLOYEE_LOCATION, ID_EMPLOYEE_MAP);

        }
    }
}