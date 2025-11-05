import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NoteService } from './services/note.service'
import { Note } from './entities/note.entity'
import { AddItemNoteInput } from './inputs/add-item.input'
import { NoteItemsOutputs } from './outputs/note-items.input'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { UpdateQuantityItemInput } from './inputs/update-quantity-item.input'

@Resolver()
export class NoteResolver {
  constructor(private noteService: NoteService) {}

  @Query(() => NoteItemsOutputs)
  async note(@CurrentUser() user: User) {
    return await this.noteService.getAllItemsNote(user.id)
  }

  @Query(() => [Note])
  async allNotes() {
    return await this.noteService.getAllNotes()
  }

  @Mutation(() => Boolean)
  async addItemInNote(
    @CurrentUser() user: User,
    @Args('addItemNoteData') addItemNoteInput: AddItemNoteInput,
  ) {
    return await this.noteService.addItemNote({
      userId: user.id,
      ...addItemNoteInput,
    })
  }

  @Mutation(() => Boolean)
  async removeItemInNote(@Args('idItemOrder') id: string) {
    return await this.noteService.removeItemNote(id)
  }

  @Mutation(() => Note)
  async createNote(@CurrentUser() user: User) {
    return await this.noteService.createNote(user.id)
  }

  @Mutation(() => Boolean)
  async updateQuantityItem(
    @Args('updateQuantityItemData')
    updateQuantityItemInput: UpdateQuantityItemInput,
  ) {
    return await this.noteService.updateQuantityItem(updateQuantityItemInput)
  }
}
