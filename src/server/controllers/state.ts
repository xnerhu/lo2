import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';
import { withAuth } from '../middleware/auth';
import { IRequest } from '../interfaces';

const router = Router();

router.get('/', handlePageRoute('home', PageService.getHomeData));

router.get(
  '/news/:category?/:page?',
  handlePageRoute('news', PageService.getNewsData),
);

router.get(
  '/article/:label',
  handlePageRoute('article', PageService.getArticleData),
);

router.get(
  '/personnel',
  handlePageRoute('personnel', PageService.getPersonnelData),
);

router.get(
  '/add-article',
  handlePageRoute('addArticle', PageService.getAddArticlePacket),
);

router.get(
  '/edit-article/:label',
  handlePageRoute('editArticle', PageService.getEditArticlePacket),
);

// router.get(
//   '/edit-article/:label',
//   handlePageRoute
//   async (req: IRequest, res, next) => {
//     const editArticlePage = await PageService.getEditArticlePacket(
//       req.params.label,
//       req.user,
//     );

//     req.appState = { ...req.appState, editArticle: editArticlePage };

//     next();
//   },
// );

export default router;
