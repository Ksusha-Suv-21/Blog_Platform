import { FC } from 'react';
import { useNavigate } from 'react-router';
//import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
//import { deleteArticle } from '../../services/articlesApi';
//import { toast } from 'react-toastify';
import { messagesConstant } from '../../utils/messages';
//import { retry } from '../../utils/retry'; самое старнное тут, скопировано вниз в комменты

import { ArticleType } from '../../types/ArticleInterfaces';
import classes from './ArticleActions.module.scss';
export interface ArticleActionsProps {
  article: ArticleType;
}

export const ArticleActions: FC<ArticleActionsProps> = ({ article }) => {
  const navigate = useNavigate();
  //const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  //const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  /*

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await retry(() => deleteArticle(article.slug), { maxAttempts: 2 });
      toast.success(MESSAGES.SUCCESS.ARTICLE_DELETED);
      navigate('/');
    } catch (error) {
      toast.error(MESSAGES.ERROR.ARTICLE_DELETE);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  */

  return (

    <>
      <div className={classes.btnActions}>
        <button className={classes['btnActions__delet']} /*onClick={() => setDeleteDialogOpen(true)} disabled={isDeleting} */>
          {messagesConstant.BUTTONS.DELETE}
        </button>
        <button className={classes['btnActions__edit']} onClick={handleEdit} /*disabled={isDeleting} */ >
          {messagesConstant.BUTTONS.EDIT}
        </button>
      </div>
    </>
  );
};

/*
диалог по удалению статьи
<Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.deleteDialog}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{messagesConstant.DIALOG.DELETE_MESSAGE}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting} color="primary" variant="outlined">
            {messagesConstant.DIALOG.CANCEL}
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus disabled={isDeleting} variant="contained">
            {isDeleting ? messagesConstant.DIALOG.DELETING : messagesConstant.DIALOG.CONFIRM}
          </Button>
        </DialogActions>
      </Dialog>



interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

const defaultConfig: Required<RetryConfig> = {
  maxAttempts: 5,
  delayMs: 1000,
  backoffFactor: 2,
};

export const retry = async <T>(fn: () => Promise<T>, config: RetryConfig = {}): Promise<T> => {
  const { maxAttempts, delayMs, backoffFactor } = { ...defaultConfig, ...config };
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(backoffFactor, attempt - 1)));
    }
  }

  throw lastError!;
};
*/