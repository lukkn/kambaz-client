"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setFolders } from "../../reducer";

import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import * as client from "../../client";

export default function ManageFoldersPage() {

    const { cid } = useParams();
    const { folders } = useSelector((state: any) => state.pazzaReducer);
    const dispatch = useDispatch();

    const [folderName, setFolderName] = useState("");
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingFolderName, setEditingFolderName] = useState<string>("");

    const fetchPazzaFolders = async () => {
        const folders = await client.findPazzaFoldersByCourse(cid as string);
        dispatch(setFolders(folders));
    }

    const createFolder = async (folderName: string) => {
        await client.createPazzaFolder(cid as string, folderName);
        fetchPazzaFolders();
    }

    const updateFolder = async (folder: any) => {
        await client.updatePazzaFolder(folder);
        fetchPazzaFolders();
    }

    const deleteFolders = async (folderIds: string[]) => {
        await client.deletePazzaFolders(folderIds);
        fetchPazzaFolders();
    }

    useEffect(() => {
        fetchPazzaFolders();
    }, []);

    useEffect(() => {
        console.log("Selected folders:", selectedFolders);
    }, [selectedFolders]);

    return (
        <div className="p-4">
            <h3 className="border-bottom">
                Configure Class Folders
            </h3>
            <p>Folders allow you to keep class content organized. When students and instructors add a new post, they will be required to specify at least one folder for their post.</p>
            <Button disabled>Disable Folders</Button>

            <p className=" mt-4 fw-bold">Create new folders:</p>
            <p>Add folders that are relevant for your class.</p>
            <div className="d-flex gap-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Add a folder(s)"
                    value={folderName}
                    onChange={e => setFolderName(e.target.value)} />
                <Button
                    className="text-white bg-pazza-primary"
                    onClick={() => createFolder(folderName)}>
                    Add Folder
                </Button>
            </div>

            <p className="fw-bold mt-4">Manage folders:</p>
            <p>Delete folders or edit folder names.</p>
            <Button className="text-white bg-pazza-primary" disabled={selectedFolders.length === 0} onClick={() => deleteFolders(selectedFolders)}><FaTrash className="me-2" />Delete Selected Folders</Button>
            <hr />
            {folders.map((folder: any) => (
                <div key={folder._id} className="d-flex align-items-center mb-3">
                    <input type="checkbox" className="me-3" onChange={() => {
                        if (selectedFolders.includes(folder._id)) {
                            setSelectedFolders(selectedFolders.filter(id => id !== folder._id));
                        } else {
                            setSelectedFolders([...selectedFolders, folder._id]);
                        }
                    }} />
                    {editingFolderId === folder._id ? (
                        <>
                            <input
                                type="text"
                                className="form-control w-50"
                                value={editingFolderName}
                                onChange={e => setEditingFolderName(e.target.value)}
                            />
                            <div className="ms-auto d-flex gap-2">
                                <Button
                                    className="text-white bg-pazza-primary"
                                    onClick={() => {
                                        const updatedFolder = { ...folder, name: editingFolderName };
                                        updateFolder(updatedFolder);
                                        setEditingFolderId(null);
                                        setEditingFolderName("");
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="text-black bg-pazza-light"
                                    onClick={() => {
                                        setEditingFolderId(null);
                                        setEditingFolderName("");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="me-3 bg-pazza-accent px-2 py-1 rounded text-pazza-primary fw-bolder">{folder.name}</span>
                            <Button className="text-black bg-pazza-light ms-auto" onClick={() => {
                                setEditingFolderId(folder._id);
                                setEditingFolderName(folder.name);
                            }}><MdEdit className="me-2" />Edit</Button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}