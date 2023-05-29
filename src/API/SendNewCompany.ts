import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/companies/";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjYwMjAzLCJpYXQiOjE2ODQyNDEwMDMsImp0aSI6ImNiODgwNTA1YWIwZTQ3NjNhZTcyNTU5NmI0OGUxYzg1IiwidXNlcl9pZCI6Mn0.b7_e1zfN0Rv3bE8QYM9X5iI91G9PNj1RwGfXL35TqbM";


export const SendNewCompany = async (data: any) => {
    axios.defaults.headers.common['Authorization'] = `JWT ${apikey}`;
    const response = await axios.post("", data);

    return response;
};
