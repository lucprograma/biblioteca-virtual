import { response } from 'express'
import Folder from '../models/folder.js'
import Document from '../models/Documents.js'
export const getFolderStructure = async (req, res) => {
    try{
        console.log("Fetching folders...")
        const folders = await Folder.findAll(
            {
                where: {parent_id: null},
                include: [{
                    model: Folder,
                    as: 'children',
                    attributes: ['folder_id','name', 'year_level', 'type'],
                    include: [{
                        model: Document,
                        as: 'documents'
                    }]
                },
                {
                    model: Document,
                    as: 'documents'
                }
            ]
            }
        )
        return res.status(200).json(folders)
    }
    catch(error){
        console.error('cannot fetch folders:', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export const getParentFolders = async (req, res) => {
    try{
        const parentFolders = await Folder.findAll({
            where: {parent_id: null},
            attributes: ['folder_id', 'name', 'year_level', 'type']
        })
        return res.status(200).json(parentFolders)
    }
    catch(error){
        console.error('Error fetching parent folders:', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export const getByParentID = async (req, res) => {
    const { parent_id } = req.params;
    try {
        const folders = await Folder.findAll({
            where: { parent_id },
            attributes: ['folder_id', 'name', 'year_level', 'type']
        });
        return res.status(200).json(folders);
    } catch (error) {
        console.error('Error fetching folders by parent ID:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}