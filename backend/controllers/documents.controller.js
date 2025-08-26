import sequelize from '../config/db.js';
import Document from '../models/Documents.js';
import Folder from '../models/folder.js';

export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll({
            include: [{
                model: Folder,
                as: 'folder',
                attributes: ['folder_id', 'name', 'parent_id']
            }],
            attributes: ['document_id', 'title', 'content', 'uploaded_by', 'folder_id', 'created_at'],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const documents = await sequelize.query(
            `SELECT d.*, t.name AS tag_name from documents d inner join document_tags dt on d.document_id = dt.document_id inner join tags t on dt.tag_id = t.tag_id WHERE t.name LIKE :tag`,
            {
                replacements: { tag: `${tag}%` },
                type: sequelize.QueryTypes.SELECT
            }
        )
        res.status(200).json(documents);
    }
    catch (error) {
        console.error('Error fetching documents by tag:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const fetchByParent = async (req, res) => {
    try{
        const id = req.params.folder_id
        console.log("folder requested:", id);
        const documents = await Document.findAll(
            {
                where: {
                    folder_id: id
                }
            }
        );
        return res.status(200).json(documents);
    }
    catch(error){
        console.error('error getting documents by folder:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const createDocument = (req, res) => {
    try{
        const {document_id, title, folder_id} = req.body
        const filePath = req.file ? req.file.filename : null;
        const newDocument = Document.create({
            document_id: document_id,
            title: title,
            content: filePath,
            uploaded_by: 1,
            folder_id: folder_id
        })
        return res.status(200).json(`Sucessful uploaded document:${newDocument.document_id}`)
    }
    catch(error){
        return res.status(500).json({
            message: 'server error',
            error: error
        })
    }
}
// export const getByTitle 

