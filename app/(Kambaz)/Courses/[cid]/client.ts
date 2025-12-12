import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;


export const findUsersForCourse = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/course/${cid}`);
    return data;
}