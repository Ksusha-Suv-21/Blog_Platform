import { useNavigate } from 'react-router';
import { useAppSelector } from '../../redux/store';
import { favoriteArticleApi, unfavoriteArticleApi } from '../../services/articlesApi';
//import { toast } from 'react-toastify';
import { messagesConstant } from '../../utils/messages';

import classes from './LikeButton.module.scss';


interface LikeButtonProps {
  articleSlug: string;
  favoritesCount: number;
  favorited: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const LikeButton: React.FC<LikeButtonProps> = () => {
    const { user } = useAppSelector((state) => state.user);


    return (
      <div className={classes.likeButton}>

       
              <label htmlFor='heart' className={classes['likeButton__label']}>
                <input
      
                  className={classes['likeButton__checkbox']}
                  onChange={(e) => (console.log(e))} 
                  type="checkbox"
                  id='heart'

                />
                <span className={classes['article__count-chek']}>{article.favoritesCount}</span>
              </label>
            
        
      </div>
  );
};

export default LikeButton;


