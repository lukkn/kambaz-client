import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const PAZZA_API = `${HTTP_SERVER}/api/pazza`;

export const createPazzaPost = async ( post: any ) => {
  const response = await axiosWithCredentials.post( PAZZA_API, post );
  return response.data;
};

export const findPazzaPostsByCourse = async ( cid: string ) => {
  const response = await axiosWithCredentials.get( `${PAZZA_API}/course/${cid}` );
  return response.data;
};

export const updatePazzaPost = async ( post: any ) => {
  const response = await axiosWithCredentials.put( `${PAZZA_API}/${post._id}`, post );
  return response.data;
};

export const deletePazzaPost = async ( pid: string ) => {
  const response = await axiosWithCredentials.delete( `${PAZZA_API}/${pid}` );
  return response.data;
};