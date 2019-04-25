interface TransitionOptions {
  from?: number
  to?: number
  duration?: number
  easing?: string
}

export async function transitionHeight(el: HTMLElement, opts: TransitionOptions): Promise<void> {
  const {
    from = el.getBoundingClientRect().height,
    to = el.getBoundingClientRect().height,
    duration = 1000,
    easing = 'ease-in-out',
  } = opts

  if (from === to || duration === 0) {
    el.style.height = to + 'px'
    return
  }

  el.style.height = from + 'px'
  // Force a style calc so the browser picks up the start value.
  getComputedStyle(el).transform
  el.style.transition = `height ${duration}ms ${easing}`
  el.style.height = to + 'px'

  return new Promise<void>(resolve => {
    const listener = (event: Event) => {
      if (event.target !== el) return
      el.style.transition = ''
      el.removeEventListener('transitionend', listener)
      el.removeEventListener('transitioncancel', listener)
      resolve()
    }

    el.addEventListener('transitionend', listener)
    el.addEventListener('transitioncancel', listener)
  })
}
