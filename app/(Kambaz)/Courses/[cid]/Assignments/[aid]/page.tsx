import { Button, Form, FormLabel, FormControl, FormSelect, FormCheck, Container, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <Form className="p-4">
                <Container>
                    <Row><Col><FormLabel for="wd-name">Assignment Name</FormLabel></Col></Row>
                    <Row className="mb-4"><Col><FormControl id="wd-name" type="text" placeholder="Enter assignment name" value="A1" /></Col></Row>

                    <Row className="mb-4"><Col><FormControl id="wd-description" as="textarea" rows={5} placeholder="Enter assignment description" /></Col></Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel for="wd-points">Points</FormLabel></Col>
                        <Col><FormControl id="wd-points" type="number" placeholder="Enter assignment points" defaultValue={100}/></Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel for="wd-group">Group</FormLabel></Col>
                        <Col><FormSelect id="wd-group">
                            <option value="assignments">ASSIGNMENTS</option>
                            <option value="quizzes">QUIZZES</option>
                            <option value="exams">EXAMS</option>
                            <option value="projects">PROJECTS</option>
                        </FormSelect>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel for="wd-display-grade-as">Display Grade as</FormLabel></Col>
                        <Col><FormSelect id="wd-display-grade-as">
                            <option value="percentage">Percentage</option>
                            <option value="points">Points</option>
                        </FormSelect></Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel for="wd-submission-type">Submission Type</FormLabel></Col>
                        <Col>
                            <div className="border rounded p-3 d-flex flex-column gap-4">
                                <FormSelect id="wd-submission-type">
                                    <option value="online">Online</option>
                                    <option value="on-paper">On Paper</option>
                                    <option value="external-tool">External Tool</option>
                                    <option value="no-submission">No Submission</option>
                                </FormSelect>

                                <div className="d-flex flex-column gap-2">
                                    <FormLabel for="wd-online-entry-options" className="fw-bold">Online Entry Options</FormLabel>
                                    <FormCheck id="wd-online-entry-options-text" type="checkbox" label="Text Entry" />
                                    <FormCheck id="wd-online-entry-options-url" type="checkbox" label="Website URL" />
                                    <FormCheck id="wd-online-entry-options-media" type="checkbox" label="Media Recording" />
                                    <FormCheck id="wd-online-entry-options-student-annotation" type="checkbox" label="Student Annotation" />
                                    <FormCheck id="wd-online-entry-options-file" type="checkbox" label="File Upload" />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1">Assign</Col>
                        <Col>
                            <div className="border rounded p-3 d-flex flex-column gap-3">
                                <div>
                                    <FormLabel for="wd-assign-to" className="fw-bold">Assign To</FormLabel>
                                    <FormSelect id="wd-assign-to">
                                        <option value="everyone">Everyone</option>
                                        <option value="section-1">Section 1</option>
                                        <option value="section-2">Section 2</option>
                                    </FormSelect>
                                </div>
                                <div>
                                    <FormLabel for="wd-due" className="fw-bold">Due</FormLabel>
                                    <FormControl id="wd-due" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
                                </div>
                                <div className="d-flex gap-2">
                                    <div className="flex-grow-1">
                                        <FormLabel for="wd-available-from" className="fw-bold">Available From</FormLabel>
                                        <FormControl id="wd-available-from" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <FormLabel for="wd-available-until" className="fw-bold">Until</FormLabel>
                                        <FormControl
                                            id="wd-available-until"
                                            type="datetime-local"
                                            defaultValue={
                                                (() => {
                                                    const date = new Date();
                                                    date.setDate(date.getDate() + 7);
                                                    return date.toISOString().slice(0, 16);
                                                })()
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit" className="me-2">Cancel</Button>
                        <Button variant="danger" type="submit">Save</Button>
                    </div>
                </Container>
            </Form>
        </div>
    );
}