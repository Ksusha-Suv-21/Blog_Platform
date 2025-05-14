import * as yup from 'yup';

export const articleSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
  body: yup.string().trim().required('Article text is required'),
  tagList: yup.array().of(yup.string().trim().required()).required().default([]),
});