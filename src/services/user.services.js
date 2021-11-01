import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = "http://localhost:5000/api/v1/";


class UserService {

    getUsers() {
        return axios.get(API_URL + 'users');
    }

    getPetitions() {
        return axios.get(API_URL + 'users/petitions');
    }

    getPanchayatInfo() {
        return axios.get(API_URL + 'users/panchayat-details')
    }

    getDepartmentCategorys() {
        return axios.get(API_URL + 'users/complaint-category')
    }

    getUnionAndPanchayats() {
        return axios.get(API_URL + 'users/union-panchayat-lists')
    }

    getFundDeptCategorys() {
        return axios.get(API_URL + 'users/fund-dept-category')
    }

    getMLAFundInfo() {
        return axios.get(API_URL + 'users/mla-funds')
    }

    getDepartmentFundUtilization() {
        return axios.get(API_URL + 'users/dashboard-department-fund-utilization')
    }

    getPanchayatFundUtilization() {
        return axios.get(API_URL + 'users/dashboard-panchayat-fund-utilization')
    }

    getPanchayatLowFundUtilization() {
        return axios.get(API_URL + 'users/dashboard-panchayat-low-fund-utilization')
    }

    getTotalDashBoard() {
        return axios.get(API_URL + 'users/dashboard-data')
    }

    getDepartmentPetions() {
        return axios.get(API_URL + 'users/dashboard-department-petitions')
    }

    getPanchayatPetions() {
        return axios.get(API_URL + 'users/dashboard-panchayat-petitions')
    }

    getDataPanchayatWise() {
        return axios.get(API_URL + 'users/dashboard-panchayat-wise-total')
    }

    getDataDepartmentWise() {
        return axios.get(API_URL + 'users/dashboard-department-wise-total')
    }

    register(firstname,
        lastname,
        mobile,
        gender,
        email) {
        return axios
            .post(API_URL + "users/create", {
                firstname,
                lastname,
                mobile,
                gender,
                email
            })
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }

    addMlaFund(mla_fund, scheme_year, scheme_title, scheme_desc, panchayat_union, panchayat, fund_dept) {
        return axios.post(API_URL + "users/mla-fund/create", { mla_fund, scheme_year, scheme_title, scheme_desc, panchayat_union, panchayat, fund_dept })
            .then(response => {
                return response.data;
            })
    }

    updateMlaFund(id, mla_fund, scheme_year, scheme_title, scheme_desc, panchayat_union, panchayat, fund_dept) {
        return axios.put(API_URL + `users/mla-fund/update/${id}`, { mla_fund, scheme_year, scheme_title, scheme_desc, panchayat_union, panchayat, fund_dept })
            .then(response => {
                return response.data;
            })
    }

    addPanchayat(panchayat_union, panchayat, panchayat_president, panchayat_clerk, panchayat_vao, panchayat_unoin, panchayat_papulation, panchayat_male, panchayat_female, panchayat_male_voters, panchyat_female_voters, panchayat_category, total_rations, total_wards) {
        return axios.post(API_URL + "users/panchayat-details/create", { panchayat_union, panchayat, panchayat_president, panchayat_clerk, panchayat_vao, panchayat_unoin, panchayat_papulation, panchayat_male, panchayat_female, panchayat_male_voters, panchyat_female_voters, panchayat_category, total_rations, total_wards })
            .then(response => {
                return response.data;
            })
    }

    updatePanchayat(id, panchayat_union, panchayat, panchayat_president, panchayat_clerk, panchayat_vao, panchayat_unoin, panchayat_papulation, panchayat_male, panchayat_female, panchayat_male_voters, panchyat_female_voters, panchayat_category, total_rations, total_wards) {
        return axios.put(API_URL + `users/panchayat-details/update/${id}`, { panchayat_union, panchayat, panchayat_president, panchayat_clerk, panchayat_vao, panchayat_unoin, panchayat_papulation, panchayat_male, panchayat_female, panchayat_male_voters, panchyat_female_voters, panchayat_category, total_rations, total_wards })
            .then(response => {
                return response.data;
            })
    }

    addPetitions(name, father_name, gender, door_no, street, panchayat_union, panchayat, mobile, pincode, department, complaints, petitions_status) {
        return axios.post(API_URL + "users/petitions/create", { name, father_name, gender, door_no, street, panchayat_union, panchayat, mobile, pincode, department, complaints, petitions_status })
            .then(response => {
                return response.data;
            })
    }

    updatePetitions(id, name, father_name, gender, door_no, street, panchayat_union, panchayat, mobile, pincode, department, complaints, petitions_status) {
        return axios.put(API_URL + `users/petitions/update/${id}`, { name, father_name, gender, door_no, street, panchayat_union, panchayat, mobile, pincode, department, complaints, petitions_status })
            .then(response => {
                return response.data;
            })
    }

    updateUser(id, firstname,
        lastname,
        mobile,
        gender,
        email) {
        return axios
            .put(API_URL + `users/update/${id}`, {
                firstname,
                lastname,
                mobile,
                gender,
                email
            }).then(response => {
                return response.data;
            });
    }

    getMlaFundById(id) {
        return axios.get(API_URL + `users/mla-fund/retrive/${id}`)
    }

    getUserId(id) {
        return axios.get(API_URL + `users/retrive/${id}`);
    }

    deleteUserId(id) {
        return axios.delete(API_URL + `users/delete/${id}`);
    }
    showToaster(msg) {
        return toast(msg);
    }
}


export default new UserService();