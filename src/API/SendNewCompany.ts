import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/companies/";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyOTc1NTA4LCJpYXQiOjE3MDA1NTYzMDgsImp0aSI6IjU2MWIwMjdiODlhODQ5NzA5OGExNWVmOTBmMmE4Y2IyIiwidXNlcl9pZCI6Mn0.QuxMp1yUk_4OhnC-CpHSLHR2Sw3ZkmXC6kovdbAGQYQ";


export const SendNewCompany = async (data: any) => {
    axios.defaults.headers.common['Authorization'] = `JWT ${apikey}`;
    const response = await axios.post("", data);

    return response;

};

export const CheckCompany = async (company_name: string) => {
    // axios.defaults.headers.common['Authorization'] = `JWT ${apikey}`;
    const response = await axios.get("check_company_name/", {params: {company_name: company_name}});
    console.log(response.data);
    
    return response;

}
    