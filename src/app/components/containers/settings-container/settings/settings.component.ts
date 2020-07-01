import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';

import {
  DisplayRate,
  ItemId,
  RecipeId,
  ResearchSpeed,
  IdType,
  Theme,
  options,
} from '~/models';
import { DatasetState } from '~/store/dataset';
import { SettingsState, initialSettingsState } from '~/store/settings';

enum OpenSelect {
  None,
  DisabledRecipes,
  Belt,
  Assembler,
  Furnace,
  Fuel,
  ProdModule,
  SpeedModule,
  BeaconModule,
}

@Component({
  selector: 'lab-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  @Input() settings: SettingsState;
  @Input() data: DatasetState;

  @Output() setDisplayRate = new EventEmitter<DisplayRate>();
  @Output() setItemPrecision = new EventEmitter<number>();
  @Output() setBeltPrecision = new EventEmitter<number>();
  @Output() setFactoryPrecision = new EventEmitter<number>();
  @Output() setBelt = new EventEmitter<ItemId>();
  @Output() setAssembler = new EventEmitter<ItemId>();
  @Output() setFurnace = new EventEmitter<ItemId>();
  @Output() disableRecipe = new EventEmitter<RecipeId>();
  @Output() enableRecipe = new EventEmitter<RecipeId>();
  @Output() setFuel = new EventEmitter<ItemId>();
  @Output() setFlowRate = new EventEmitter<number>();
  @Output() setProdModule = new EventEmitter<ItemId>();
  @Output() setSpeedModule = new EventEmitter<ItemId>();
  @Output() setBeaconModule = new EventEmitter<ItemId>();
  @Output() setBeaconCount = new EventEmitter<number>();
  @Output() setDrillModule = new EventEmitter<boolean>();
  @Output() setMiningBonus = new EventEmitter<number>();
  @Output() setResearchSpeed = new EventEmitter<ResearchSpeed>();
  @Output() setExpensive = new EventEmitter<boolean>();
  @Output() setTheme = new EventEmitter<Theme>();

  openSelect = OpenSelect.None;
  scrollTop = 0;

  DisplayRate = DisplayRate;
  ItemId = ItemId;
  OpenSelect = OpenSelect;
  ResearchSpeed = ResearchSpeed;
  SelectType = IdType;
  Theme = Theme;

  initial = initialSettingsState;
  options = options;

  @HostListener('scroll', ['$event'])
  scroll(event: Event) {
    this.scrollTop = (event.target as HTMLElement).scrollTop;
  }

  constructor() {}

  emitNumber(emitter: EventEmitter<number>, event: any) {
    if (event.target.value) {
      const value = Math.round(Number(event.target.value));
      emitter.emit(value);
    }
  }

  emitString(emitter: EventEmitter<string>, event: any) {
    if (event.target.value) {
      emitter.emit(event.target.value);
    }
  }
}