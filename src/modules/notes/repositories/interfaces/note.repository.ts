import { Note } from '../../entities/note.entity'
import { NoteItemsResponseDto } from '../../dtos/note-items.response.dto'
import { CreateItemNoteDto } from '../../dtos/create-item-note.dto'
import {
  FindItemNoteDto,
  QuantityItemsOrderDto,
} from '../../dtos/note-params.dto'
import { ItemsOnOrders } from 'src/modules/customer-service/entities/order.entity'

export interface NoteRepository {
  findAllNotes(): Promise<Note[]>
  findItemsNotes(userId: string): Promise<NoteItemsResponseDto>
  findNoteByUserId(userId: string): Promise<Note>
  findNoteById(noteId: string): Promise<Note>
  findItemNoteById(itemOnOrderId: string): Promise<ItemsOnOrders>
  findItemNoteByItemIdAndNoteId(
    findItemNoteDto: FindItemNoteDto,
  ): Promise<ItemsOnOrders>
  addItem(addItemNote: CreateItemNoteDto): Promise<void>
  removeItem(itemId: string): Promise<void>
  createNote(userId: string): Promise<Note>
  updateQuantityItem(
    quantityItemsOrderDto: QuantityItemsOrderDto,
  ): Promise<ItemsOnOrders>
  quantityItemsOrder(): Promise<number>
}
