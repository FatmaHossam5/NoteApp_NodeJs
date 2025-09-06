import noteModel from "../../../DB/model/note.js"
import { asyncHandler } from "../../../services/errorHandling.js"

/**
 * Create a new note
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const addNote = asyncHandler(async (req, res, next) => {
    const { title, desc } = req.body;
    const newNote = new noteModel({ title, desc, userID: req.user._id });
    const savedNote = await newNote.save();
    
    res.status(201).json({ 
        message: "Note created successfully", 
        note: savedNote 
    });
});
   
 

/**
 * Get all notes for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const userNotes = asyncHandler(async (req, res, next) => {
    const noteList = await noteModel.find({ userID: req.user._id });
    res.json({ 
        message: "Notes retrieved successfully", 
        notes: noteList,
        count: noteList.length
    });
});

/**
 * Get a specific note by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const getNoteByID = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const note = await noteModel.findById(id).populate([
        {
            path: "userID",
            select: 'email name'
        }
    ]);
    
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    
    res.json({ message: "Note retrieved successfully", note });
});

/**
 * Update a note
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const updateNote = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    const note = await noteModel.findOneAndUpdate(
        { _id: id, userID: req.user._id },
        { title, desc }, 
        { new: true }
    );

    if (!note) {
        return res.status(404).json({ 
            message: "Note not found or you are not authorized to update this note" 
        });
    }

    res.json({ message: "Note updated successfully", note });
});

/**
 * Delete a note
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const deleteNote = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await noteModel.deleteOne({ _id: id, userID: req.user._id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ 
            message: "Note not found or you are not authorized to delete this note" 
        });
    }

    res.json({ message: "Note deleted successfully" });
});


