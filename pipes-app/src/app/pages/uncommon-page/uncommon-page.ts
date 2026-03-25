import { ChangeDetectionStrategy, Component, NgModule, signal } from '@angular/core';
import { Card } from "../../../components/card/card";
import { AsyncPipe, CommonModule, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe } from '@angular/common';
import { interval, map, Observable, tap } from 'rxjs';


const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 35,
  address: 'Ottawa, Canada'
}

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 25,
  address: 'Ottawa, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe, CommonModule, JsonPipe, KeyValuePipe, AsyncPipe, ],
  templateUrl: './uncommon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPage {
  // i18 select
  client = signal(client1)

  // i18 select
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return
    }
    this.client.set(client1)

  }

  // i18 plural

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos 1 cliente esperando.',
    other: 'tenemos # clientes esperando.'
  })

  clients = signal([
    'Fernando',
    'Melissa',
    'Maria',
    'Pedro',
    'Javier',
    'Manolo',
    'Marta'
  ])

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }


  //KeyVlaue Pipe
  profile = {
    name: 'Fernando',
    age: 35,
    address: 'Ottawa, Canada'
  }

  //Async Pipe

  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Rejected')
      resolve('Promose datos')
    }, 3500)
  })

  myObservable = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log(value)),
  )

}

