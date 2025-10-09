import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { NoteRepository } from '../repositories/interfaces/note.repository'
import { Note } from '@prisma/client'
import { NoteItemsResponseDto } from '../dtos/note-items.response.dto'
import { AddItemNoteDto } from '../dtos/add-item-note.dto'
import { MenuService } from 'src/modules/menus/services/menu.service'
import { UsersService } from 'src/modules/users/services/users.service'

@Injectable()
export class NoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: NoteRepository,
    private itemService: MenuService,
    private usersService: UsersService,
  ) {}

  async createNote(userId: string): Promise<Note> {
    await this.usersService.getUserById(userId)
    const note = await this.noteRepository.createNote(userId)

    return note
  }

  async getNote(noteId: string): Promise<Note> {
    const note = await this.noteRepository.findNote(noteId)

    if (!note) {
      throw new NotFoundException('note not found!')
    }

    return note
  }

  async getNoteByUserId(userId: string): Promise<Note> {
    const note = await this.noteRepository.findNote(userId)

    if (!note) {
      throw new NotFoundException('note not found!')
    }

    return note
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.findAllNotes()
  }

  async getAllItemsNote(userId: string): Promise<NoteItemsResponseDto> {
    await this.getNoteByUserId(userId)
    const note = await this.noteRepository.findItemsNotes(userId)

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
