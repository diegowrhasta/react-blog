function onInteractiveKeyDown (key: string, callback: () => void) {
  if (key === 'Enter' || key === ' ') {
    callback()
  }
}

export { onInteractiveKeyDown }
