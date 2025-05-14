import { useNavigate } from 'react-router';
import CreateArticle from "../../components/CreateArticle";
import { createArticle } from '../../services/articlesApi';
import { ICreateArticle } from "../../types/ArticleInterfaces";
import { toast } from 'react-toastify';
import { useState } from 'react';


const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: ICreateArticle = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  const handleSubmit = async (data: ICreateArticle) => {
    try {
      setIsLoading(true)
      const res = await createArticle(data)
      toast.success('Article created successfully')
      navigate(`/articles/${res.article.slug}`)
    } catch (error) {
      toast.error('Error creating article')
    } finally {
      setIsLoading(false)
    }
  }


  return <CreateArticle initialData={initialValues} onSubmit={handleSubmit} isLoading={isLoading} mode={'create'} />

};

export default CreateArticlePage;