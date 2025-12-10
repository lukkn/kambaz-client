'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
    getContent: () => string;
};

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
    ({ value, onChange, placeholder = 'Write something...' }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const quillRef = useRef<Quill | null>(null);

        const removeExistingToolbar = () => {
            const editorEl = editorRef.current;
            if (!editorEl || !editorEl.parentElement) {
                return;
            }

            const maybeToolbarBefore = editorEl.previousSibling as HTMLElement | null;
            if (maybeToolbarBefore && maybeToolbarBefore.classList?.contains('ql-toolbar')) {
                maybeToolbarBefore.remove();
            }

            const maybeToolbarAfter = editorEl.nextSibling as HTMLElement | null;
            if (maybeToolbarAfter && maybeToolbarAfter.classList?.contains('ql-toolbar')) {
                maybeToolbarAfter.remove();
            }
        };

        useEffect(() => {
            if (quillRef.current || !editorRef.current) {
                return;
            }

            // Clear any previous toolbar/editor DOM
            removeExistingToolbar();
            editorRef.current.innerHTML = '';

            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                },
                placeholder,
            });

            quillRef.current = quill;

            const handleTextChange = () => {
                onChange(quill.root.innerHTML);
            };

            quill.on('text-change', handleTextChange);

            if (value) {
                quill.clipboard.dangerouslyPasteHTML(value);
            }

            return () => {
                quill.off('text-change', handleTextChange);
                quillRef.current = null;
                // Clean up editor DOM to prevent duplicate toolbars
                if (editorRef.current) {
                    editorRef.current.innerHTML = '';
                }
                removeExistingToolbar();
            };
        }, [onChange, placeholder]);

        useEffect(() => {
            const quill = quillRef.current;
            if (!quill) {
                return;
            }

            const currentHtml = quill.root.innerHTML;
            if (value !== currentHtml) {
                quill.clipboard.dangerouslyPasteHTML(value || '');
            }
        }, [value]);

        useImperativeHandle(ref, () => ({
            getContent: () => {
                if (quillRef.current) {
                    return quillRef.current.root.innerHTML;
                }
                return '';
            },
        }));

        return <div ref={editorRef} style={{ minHeight: '300px' }} />;
    }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;