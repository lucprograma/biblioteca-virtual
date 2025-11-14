import express from 'express';

import authsRoutes from './auth.routes.js';
import careersRoutes from './careers.routes.js';
import documentsRoutes from './documents.routes.js';
import foldersRoutes from './folders.routes.js';
import newsRoutes from './news.routes.js';
import tagsRoutes from './tags.routes.js';


export default function routerApi(app) {

    const router = express.Router();

    app.use('/api', router);

    router.use('/auth', authsRoutes);
    router.use('/careers', careersRoutes);
    router.use('/documents', documentsRoutes);
    router.use('/folders', foldersRoutes);
    router.use('/news', newsRoutes);
    router.use('/tags', tagsRoutes);
}