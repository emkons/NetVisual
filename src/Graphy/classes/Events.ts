import nanoid = require('nanoid')

interface IEvents {
  [name: string]: IEvent
}

interface IEvent {
  [eventId: string]: (payload: any) => void
}

export default class Events {
  private events: IEvents = {}

  public subscribe(name: string, callback: (payload: any) => void): string {
    if (!(name in this.events)) {
      this.events[name] = {}
    }
    const eventId = nanoid()
    this.events[name][eventId] = callback
    return eventId
  }

  public dispatch(name: string, payload: any): void {
    if (name in this.events) {
      for (const event in this.events[name]) {
        this.events[name][event](payload)
      }
    }
  }
}
