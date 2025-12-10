import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const PAZZA_API = `${HTTP_SERVER}/api/pazza`;
export const PAZZA_FOLDERS_API = `${PAZZA_API}/folders`;

export const createPazzaPost = async (post: any) => {
  const response = await axiosWithCredentials.post(PAZZA_API, post);
  return response.data;
};

export const findPazzaPostsByCourse = async (cid: string, fid?: any) => {
  if (!fid) {
    const response = await axiosWithCredentials.get(`${PAZZA_API}/${cid}`);
    return response.data;
  } else {
    const response = await axiosWithCredentials.get(`${PAZZA_API}/${cid}/folder/${fid}`);
    return response.data;
  }
};

export const updatePazzaPost = async (post: any) => {
  const response = await axiosWithCredentials.put(`${PAZZA_API}/${post._id}`, post);
  return response.data;
};

export const deletePazzaPost = async (pid: string) => {
  const response = await axiosWithCredentials.delete(`${PAZZA_API}/${pid}`);
  return response.data;
};

export const findPazzaFoldersByCourse = async (cid: string) => {
  const response = await axiosWithCredentials.get(`${PAZZA_FOLDERS_API}/${cid}`);
  return response.data;
};

export const createPazzaFolder = async (cid: string, folderName: string) => {
  const folder = { course: cid, name: folderName };
  console.log("Creating folder:", folder);
  const response = await axiosWithCredentials.post(PAZZA_FOLDERS_API, folder);
  return response.data;
};

export const updatePazzaFolder = async (folder: any) => {
  const response = await axiosWithCredentials.put(`${PAZZA_FOLDERS_API}/${folder._id}`, folder);
  return response.data;
};

export const deletePazzaFolders = async (fids: string[]) => {
  const response = await axiosWithCredentials.delete(`${PAZZA_FOLDERS_API}/delete`, { data: fids });
  return response.data;
};

export const findPazzaFollowUpsByPost = async (pid: string) => {
  const response = await axiosWithCredentials.get(`${PAZZA_API}/followup/${pid}`);
  return response.data;
};

export const createPazzaFollowUp = async (followUp: any) => {
  const response = await axiosWithCredentials.post(`${PAZZA_API}/followup`, followUp);
  return response.data;
};

export const updatePazzaFollowUp = async (followUp: any) => {
  const response = await axiosWithCredentials.put(`${PAZZA_API}/followup/${followUp._id}`, followUp);
  return response.data;
};

export const deletePazzaFollowUp = async (fid: string) => {
  const response = await axiosWithCredentials.delete(`${PAZZA_API}/followup/${fid}`);
  return response.data;
};

