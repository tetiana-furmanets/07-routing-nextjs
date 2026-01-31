'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  readonly onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm({ onClose }: Readonly<NoteFormProps>) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Minimum 3 characters')
          .max(50, 'Maximum 50 characters')
          .required('Title is required'),
        content: Yup.string().max(500, 'Maximum 500 characters'),
        tag: Yup.string()
          .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
          .required('Tag is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" className={css.error} />
        </div>

        <div className={css.field}>
          <Field as="textarea" name="content" placeholder="Content" />
          <ErrorMessage name="content" component="div" className={css.error} />
        </div>

        <div className={css.field}>
          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={mutation.isPending}>
            Create Note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
