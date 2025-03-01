import { Note } from '../../entities/note.entity'
import { NoteItemsResponseDto } from '../../dtos/note-items.response.dto'
import { AddItemNoteDto } from '../../dtos/add-item-note.dto'

export interface NoteRepository {
  findAllNotes(): Promise<Note[]>
  findItemsNotes(noteId: string): Promise<NoteItemsResponseDto>
  findNote(noteId: string): Promise<Note>
  addItem(addItemNote: AddItemNoteDto): Promise<void>
  removeItem(itemId: string): Promise<void>
  createNote(): Promise<Note>
  quantityItemsOrder(): Promise<number>
}
