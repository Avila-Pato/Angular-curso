import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import {  DatePipe, I18nSelectPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { AvaibleLocales, LocaleService } from '../../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe, I18nSelectPipe],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPage {

  // Idioma change
  localService = inject(LocaleService)
  //Current locale
  currentLocale =  signal(inject(LOCALE_ID))


  nameLower = signal('ironman')
  nameUpper = signal('IRONMAN')
  fullName = signal('Iván Díaz')


  customDate = signal(new Date())

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000)

    onCleanup(() => {
      clearInterval(interval)
    })
  })
  //Change local

  changeLocale(locale: AvaibleLocales) {
    this.localService.changeLocal(locale)
  }
}
