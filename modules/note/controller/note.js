import noteModel from "../../../DB/model/note.js"
import { asyncHandler } from "../../../services/errorHandling.js"

export const addBlog = asyncHandler(async (req, res,next) => {
    
        const { title, desc } = req.body
        const newNote = new noteModel({ title, desc, userID: req.user._id })
        const savedNote = await newNote.save()
        res.json({ message: "Done", savedNote })
    } )
   
 

    export const userNotes = asyncHandler(
        async (req, res,next) => {
        
            const NoteList = await noteModel.find({ userID: req.user._id })
            res.json({ message: "Blog Module", NoteList })
         
     
    }
    )

    export const getNoteByID = asyncHandler(async (req, res,next) => {
        
        const { id } = req.params
        const Note = await noteModel.findById(id).populate([
            {
                path: "userID",
                select: 'email name'
            }
        ]) 
        Note ? res.json({ message: "Done", Note }) : res.json({ message: "In-valid ID" })
   
}) 
    
     
export const updateNote = asyncHandler(async (req, res,next) => {
  
    const { id } = req.params;
    const { title, desc } = req.body;

    const note = await noteModel.findOneAndUpdate({ _id: id, userID: req.user._id },
        { title, desc }, { new: true })
 
    note ? res.json({ message: "Done", note }) :
        res.json({ message: "In-valid iD or u are not auth" })

}) 

export const deleteNote =asyncHandler(
    async (req, res,next) => {
   
        const { id } = req.params;

        const note = await noteModel.deleteOne({ _id: id, userID: req.user._id })

        note.deletedCount ? res.json({ message: "Done", note }) :
            res.json({ message: "In-valid iD or u are not auth" })
    

}  
) 


