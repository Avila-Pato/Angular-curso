import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { CommonModule, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPage {

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
}
