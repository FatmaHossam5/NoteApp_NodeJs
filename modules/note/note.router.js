import { Router } from "express";
const router =Router()
import {auth} from '../../middleware/auth.js'
import {validation} from '../../middleware/validation.js'
import * as validator from './note.validation.js'
 import * as noteController from './controller/note.js'
 router.post("/add",auth(),validation(validator.addNoteValidate),noteController.addBlog)
 router.get("/notes/:id",auth(),validation(validator.NoteValidate),noteController.userNotes)
 router.put('/update/:id',auth(),validation(validator.updateNoteValidate),noteController.updateNote)
 router.delete('/delete/:id',auth(),validation(validator.NoteValidate),noteController.deleteNote)


export default router