import { Injectable } from '@nestjs/common'
import { NoteRepository } from '../interfaces/note.repository'
import { Note } from '../../entities/note.entity'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { NoteItemsResponseDto } from '../../dtos/note-items.response.dto'
import { CreateItemNoteDto } from '../../dtos/create-item-note.dto'
import {
  FindItemNoteDto,
  QuantityItemsOrderDto,
} from '../../dtos/note-params.dto'
import { ItemsOnOrders } from 'src/modules/customer-service/entities/order.entity'

@Injectable()
export class NotePersistence implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async createNote(userId: string): Promise<Note> {
    const note = await this.prisma.note.create({ data: { userId } })
    return note
  }

  async findNoteById(noteId: string): Promise<Note> {
    return await this.prisma.note.findUnique({ where: { id: noteId } })
  }

  async findItemNoteById(itemOnOrderId: string): Promise<ItemsOnOrders> {
    return await this.prisma.itemsOnOrders.findUnique({
      where: { id: itemOnOrderId },
    })
  }

  async findItemNoteByItemIdAndNoteId({
    itemId,
    noteId,
  }: FindItemNoteDto): Promise<ItemsOnOrders> {
    return await this.prisma.itemsOnOrders.findFirst({
      where: { itemId, noteId },
    })
  }

  async findNoteByUserId(userId: string): Promise<Note> {
    return await this.prisma.note.findUnique({
      where: { userId },
      include: { items: true },
    })
  }

  async findAllNotes(): Promise<Note[]> {
    const allNotes = await this.prisma.note.findMany()

    return allNotes
  }

  async findItemsNotes(userId: string): Promise<NoteItemsResponseDto> {
    const note = await this.prisma.note.findUnique({
      where: { userId },
      include: { items: { include: { item: true } } },
    })

    const noteResponse: NoteItemsResponseDto = {
      id: note.id,
      total: note.total,
      userId: note.userId,
      items: note.items.map((item) => ({
        id: item.id,
        itemId: item.itemId,
        quantity: item.quantity,
        name: item.item.name,
        price: item.item.price,
        imgUrl: item.item.imgUrl,
      })),
    }

    return noteResponse
  }

  async addItem({
    itemId,
    noteId,
    quantity,
  }: CreateItemNoteDto): Promise<void> {
    await this.prisma.itemsOnOrders.create({
      data: {
        quantity,
        itemId,
        noteId,
      },
    })
  }

  async updateQuantityItem({
    itemOnOrderId,
    quantity,
  }: QuantityItemsOrderDto): Promise<ItemsOnOrders> {
    return await this.prisma.itemsOnOrders.update({
      where: { id: itemOnOrderId },
      data: { quantity },
    })
  }

  async removeItem(itemId: string): Promise<void> {
    await this.prisma.itemsOnOrders.delete({
      where: { id: itemId },
    })
  }

  async quantityItemsOrder(): Promise<number> {
    const quantity = await this.prisma.itemsOnOrders.aggregate({
      _count: {
        noteId: true,
      },
    })

    return quantity._count.noteId
  }
}
