import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NoteService } from './services/note.service'
import { Note } from './entities/note.entity'
import { AddItemNoteInput } from './inputs/add-item.input'
import { NoteItemsOutputs } from './outputs/note-items.input'

@Resolver()
export class NoteResolver {
  constructor(private noteService: NoteService) {}

  @Query(() => NoteItemsOutputs)
  async note(@Args('id') id: string) {
    return await this.noteService.getAllItemsNote(id)
  }

  @Query(() => [Note])
  async allNotes() {
    return await this.noteService.getAllNotes()
  }

  // @Query(() => NoteItemsResponseDto)
  // async allItemsNotes(@Args('id') id: string) {
  //   return await this.noteService.getAllItemsNote(id)
  // }

  @Mutation(() => Boolean)
  async addItemInNote(
    @Args('addItemNoteData') addItemNoteInput: AddItemNoteInput,
  ) {
    return await this.noteService.addItemNote(addItemNoteInput)
  }

  @Mutation(() => Boolean)
  async removeItemInNote(@Args('idItemOrder') id: string) {
    return await this.noteService.removeItemNote(id)
  }

  @Mutation(() => Note)
  async createNote() {
    return await this.noteService.createNote()
  }
}
