import { Module } from '@nestjs/common'
import { NoteResolver } from './notes.resolver'
import { NoteService } from './services/note.service'
import { NotePersistence } from './repositories/implementations/note.persistence'
import { MenusModule } from '../menus/menus.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [MenusModule, UsersModule],
  providers: [
    { provide: 'NoteRepository', useClass: NotePersistence },
    NoteService,
    NoteResolver,
  ],
})
export class NotesModule {}
