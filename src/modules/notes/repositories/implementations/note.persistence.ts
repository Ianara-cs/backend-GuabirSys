import { Injectable } from '@nestjs/common'
import { NoteRepository } from '../interfaces/note.repository'
import { Note } from '../../entities/note.entity'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Prisma } from '@prisma/client'
import { NoteItemsResponseDto } from '../../dtos/note-items.response.dto'
import { AddItemNoteDto } from '../../dtos/add-item-note.dto'

@Injectable()
export class NotePersistence implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async createNote(): Promise<Note> {
    const note = await this.prisma.note.create({ data: { total: 1 } })
    return note
  }

  async findNote(noteId: string): Promise<Note> {
    try {
      return await this.prisma.note.findUnique({ where: { id: noteId } })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findAllNotes(): Promise<Note[]> {
    try {
      const allNotes = await this.prisma.note.findMany()

      return allNotes
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findItemsNotes(noteId: string): Promise<NoteItemsResponseDto> {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
        include: { items: true },
      })

      const noteResponse: NoteItemsResponseDto = {
        id: note.id,
        total: note.total,
        items: note.items.map((item) => ({
          id: item.id,
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      }

      return noteResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async addItem({ itemId, noteId, quantity }: AddItemNoteDto): Promise<void> {
    try {
      await this.prisma.itemsOnOrders.create({
        data: {
          quantity,
          itemId,
          noteId,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async removeItem(itemId: string): Promise<void> {
    try {
      await this.prisma.itemsOnOrders.delete({
        where: { id: itemId },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
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
