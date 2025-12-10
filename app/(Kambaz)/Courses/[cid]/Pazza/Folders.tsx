import { useSelector } from "react-redux";

export default function Folders(){

    const folders = useSelector((state: any) => state.pazzaReducer.folders);
    return (
        <div className="d-flex bg-pazza-secondary text-white px-3 py-2 gap-4 rounded-bottom-4">
            {folders?.map((folder: any) => (
                <div key={folder._id} className="">
                    {folder.name}
                </div>
            ))}
        </div>
    )/*  */
}   