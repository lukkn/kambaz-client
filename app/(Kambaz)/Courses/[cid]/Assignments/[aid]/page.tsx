export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" />
            <br />
            <br />
            <textarea id="wd-description" defaultValue={`This assignment covers environment setup and basic HTML.`} />
            <br />
            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" type="number" defaultValue={100} />
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group">
                                <option value="group1">ASSIGNMENTS</option>
                                <option value="group2">QUIZZES</option>
                                <option value="group3">EXAMS</option>
                                <option value="group4">PROJECTS</option>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade As</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as">
                                <option value="percentage">Percentage</option>
                                <option value="points">Points</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="submission-type">
                                <option value="online">Online</option>
                                <option value="on-paper">On Paper</option>
                                <option value="no-submission">No Submission</option>
                            </select>
                            <div>
                                <p>Online Entry Options</p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="wd-text-entry" name="wd-online-entry-options" />
                                                <label htmlFor="wd-text-entry">Text Entry</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="wd-website-url" name="wd-online-entry-options" />
                                                <label htmlFor="wd-website-url">Website URL</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="wd-media-recordings" name="wd-online-entry-options" />
                                                <label htmlFor="wd-media-recordings">Media Recordings</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="wd-student-annotation" name="wd-online-entry-options" />
                                                <label htmlFor="wd-student-annotation">Student Annotation</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="wd-file-upload" name="wd-online-entry-options" />
                                                <label htmlFor="wd-file-upload">File Uploads</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">Assign</td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="wd-assign-to">Assign To</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="wd-assign-to" defaultValue="Everyone" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="wd-due-date">Due</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="wd-due-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="wd-available-from">Available From</label>
                                        </td>

                                        <td>
                                            <input id="wd-available-from" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="wd-available-until">Until</label>
                                        </td>

                                        <td>
                                            <input id="wd-available-until" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div >
    );
}
