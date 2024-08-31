import { Subject } from 'rxjs'

export function RunNotifier (subject: Subject<boolean>) {
  subject.next(true)
  subject.complete()
}
