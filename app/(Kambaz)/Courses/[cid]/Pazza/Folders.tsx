export default function Folders(){

    const foldersList = [
        { id: 1, name: "hw1" },
        { id: 2, name: "hw2" },
        { id: 3, name: "hw3" },
        { id: 4, name: "hw4" },
        { id: 5, name: "hw5" },
        { id: 6, name: "hw6" },
        { id: 7, name: "hw7" },
        { id: 8, name: "hw8" },
        { id: 9, name: "hw9" },
        { id: 10, name: "hw10" },
        { id: 11, name: "project" },
    ];

    return (
        <div className="d-flex bg-pazza-secondary text-white px-3 py-2 gap-4 rounded-bottom-4">
            {foldersList.map((folder) => (
                <div key={folder.id} className="">
                    {folder.name}
                </div>
            ))}
        </div>
    )/*  */
}   