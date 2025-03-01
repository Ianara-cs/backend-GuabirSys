import { Module } from '@nestjs/common'
import { MenuService } from './services/menu.service'
import { MenuPersistence } from './repositories/implementations/menu.persistence'
import { MenuResolver } from './resolvers/menu.resolver'

@Module({
  providers: [
    { provide: 'MenuRepository', useClass: MenuPersistence },
    MenuService,
    MenuResolver,
  ],
  exports: [MenuService],
})
export class MenusModule {}
