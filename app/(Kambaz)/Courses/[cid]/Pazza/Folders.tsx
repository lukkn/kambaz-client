import { useSelector } from "react-redux";

export default function Folders({ folderId, setFolderId }: { folderId: string | null, setFolderId: (id: string) => void }) {

    const folders = useSelector((state: any) => state.pazzaReducer.folders);

    return (
        <div className="d-flex bg-pazza-secondary text-white gap-2 rounded-bottom-4 px-3">
            {folders?.map((folder: any) => (
                <div key={folder._id} className={`px-2 py-1 ${folderId === folder._id ? "border border-2" : ""}`} role="button" onClick={() => setFolderId(folder._id)}>
                    {folder.name}
                </div>
            ))}
        </div>
    )/*  */
}   