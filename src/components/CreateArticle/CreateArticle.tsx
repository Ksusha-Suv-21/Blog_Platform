import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { articleSchema } from './validatCreateArticle';
import { ICreateArticle } from '../../types/ArticleInterfaces';
import classes from './CreateArticle.module.scss'

interface ArticleFormProps {
  mode: 'create' | 'edit';
  initialData?: ICreateArticle;
  onSubmit: (values: ICreateArticle) => Promise<void>;
  isLoading?: boolean;
  
}


const CreateArticle: FC<ArticleFormProps> = ({ mode, initialData, onSubmit, isLoading = false }) => {
  const [tags, setTags] = useState<string[]>(initialData?.tagList?.length ? initialData.tagList : ['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateArticle>({
    defaultValues: initialData,
    resolver: yupResolver(articleSchema),
  });


  const onSubmitHandle = async (formValues: ICreateArticle) => {
    const nonEmptyTags = tags.filter((tag) => tag.trim() !== '');
    await onSubmit({
      ...formValues,
      tagList: nonEmptyTags,
    });
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleDeleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    if (newTags.length === 0) {
      setTags(['']);
    } else {
      setTags(newTags);
    }
  };


  return (
    <div className={classes.createArticle} >

      <h1 className={classes['createArticle__title']}>
        {mode ==='edit' ? 'Edit article' : 'Create new article'}
      </h1>

      <form className={classes['createArticle__form']} onSubmit={handleSubmit(onSubmitHandle)}>

        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          placeholder='title'
          margin="normal"
        />

        <TextField
          label="Short description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          placeholder='Description'
          margin="normal"
        />

         <TextField
          label="Body"
          {...register('body')}
          error={!!errors.body}
          helperText={errors.body?.message}
          fullWidth
          placeholder='Body'
          multiline
          rows={8}
          margin="normal"
          
        />

        {tags.map((tag, index) => (
          <div key={index} className={classes['createArticle__tags']}>
            <TextField
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              size="small"
              placeholder="Tag"
              sx={{
                minWidth: '300px',
                '& .MuiInputBase-input': {
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                },
              }}
            />

          <button type="button" onClick={() => handleDeleteTag(index)} className={classes['createArticle__deleteTagsBtn']}>
            Delete
          </button>
          {index === tags.length - 1 && (
            <button type="button" onClick={handleAddTag} className={classes['createArticle__addTagsBtn']}>
              Add tag
            </button>
          )}
          </div>
          )
        )}

        <button className={classes['createArticle__btn']}>{isLoading ? 'Saving...' : mode === 'edit' ? 'Send' : 'Send' }</button>
      </form>
    </div>
  )

};

export default CreateArticle;