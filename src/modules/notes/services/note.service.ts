import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { NoteRepository } from '../repositories/interfaces/note.repository'
import { NoteItemsResponseDto } from '../dtos/note-items.response.dto'
import { MenuService } from 'src/modules/menus/services/menu.service'
import { AddItemNoteDto } from '../dtos/add-item-note.dto'
import { ItemsOnOrders } from 'src/modules/customer-service/entities/order.entity'
import { QuantityItemsOrderDto } from '../dtos/note-params.dto'
import { Note } from '../entities/note.entity'

@Injectable()
export class NoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: NoteRepository,
    private itemService: MenuService,
  ) {}

  async createNote(userId: string): Promise<Note> {
    const note = this.getNoteByUserId(userId)

    if (note) {
      throw new BadRequestException('User already has a note!')
    }
    const newNote = await this.noteRepository.createNote(userId)

    return newNote
  }

  async getNote(noteId: string): Promise<Note> {
    const note = await this.noteRepository.findNoteById(noteId)

    if (!note) {
      throw new NotFoundException('note not found!')
    }

    return note
  }

  async getItemNote(itemOnOrderId: string): Promise<ItemsOnOrders> {
    const itemOnOrder =
      await this.noteRepository.findItemNoteById(itemOnOrderId)

    if (!itemOnOrder) {
      throw new NotFoundException('Item not found!')
    }

    return itemOnOrder
  }

  async getNoteByUserId(userId: string): Promise<Note> {
    const note = await this.noteRepository.findNoteByUserId(userId)

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

    console.log(note)

    return note
  }

  async addItemNote({
    userId,
    itemId,
    quantity,
  }: AddItemNoteDto): Promise<boolean> {
    const note = await this.getNoteByUserId(userId)
    await this.itemService.getItemById(itemId)

    const itemOnNote = await this.noteRepository.findItemNoteByItemIdAndNoteId({
      noteId: note.id,
      itemId,
    })

    if (itemOnNote) {
      await this.updateQuantityItem({
        itemOnOrderId: itemOnNote.id,
        quantity: quantity + itemOnNote.quantity,
      })
    } else {
      await this.noteRepository.addItem({ noteId: note.id, itemId, quantity })
    }

    return true
  }

  async updateQuantityItem({
    itemOnOrderId,
    quantity,
  }: QuantityItemsOrderDto): Promise<boolean> {
    await this.getItemNote(itemOnOrderId)
    await this.noteRepository.updateQuantityItem({ itemOnOrderId, quantity })
    return true
  }

  async removeItemNote(idItemOrder: string): Promise<boolean> {
    await this.getItemNote(idItemOrder)
    await this.noteRepository.removeItem(idItemOrder)
    return true
  }
}
