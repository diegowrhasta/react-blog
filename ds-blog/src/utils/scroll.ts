function isAtBottom (container: HTMLDivElement) {
  return container.scrollHeight - container.scrollTop === container.clientHeight
}

function scrollToBottom (container: HTMLDivElement) {
  container.scrollTop = container.scrollHeight
}

function onContentUpdate (scrollContainer: HTMLDivElement) {
  if (isAtBottom(scrollContainer)) {
    scrollToBottom(scrollContainer)
  }
}

export { onContentUpdate }
