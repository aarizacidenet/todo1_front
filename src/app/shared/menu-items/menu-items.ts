import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

  { state: 'lists', type: 'link', name: 'Productos', icon: 'view_list' },
  { state: 'historico', type: 'link', name: 'Movimientos', icon: 'av_timer' }

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
