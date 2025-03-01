import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { NoteRepository } from '../repositories/interfaces/note.repository'
import { Note } from '@prisma/client'
import { NoteItemsResponseDto } from '../dtos/note-items.response.dto'
import { AddItemNoteDto } from '../dtos/add-item-note.dto'
import { MenuService } from 'src/modules/menus/services/menu.service'

@Injectable()
export class NoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: NoteRepository,
    private itemService: MenuService,
  ) {}

  async createNote(): Promise<Note> {
    const note = await this.noteRepository.createNote()

    return note
  }

  async getNote(noteId: string): Promise<Note> {
    const note = await this.noteRepository.findNote(noteId)

    // const

    if (!note) {
      throw new NotFoundException('note not found!')
    }

    return note
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.findAllNotes()
  }

  async getAllItemsNote(noteId: string): Promise<NoteItemsResponseDto> {
    await this.getNote(noteId)
    const note = await this.noteRepository.findItemsNotes(noteId)

    return note
  }

  async addItemNote(addItemData: AddItemNoteDto): Promise<boolean> {
    await this.getNote(addItemData.noteId)
    await this.itemService.getItemById(addItemData.itemId)
    await this.noteRepository.addItem(addItemData)
    return true
  }

  async removeItemNote(idItemOrder: string): Promise<boolean> {
    await this.noteRepository.removeItem(idItemOrder)
    return true
  }
}
