interface ConfigInterface {
  mockMode: boolean
  initialized: boolean
}

const _CONFIG: ConfigInterface = {
  mockMode: false,
  initialized: false
}

function getConfig () {
  if (!_CONFIG.initialized) {
    _CONFIG.mockMode = import.meta.env.VITE_APP_MODE_MOCK
  }

  return _CONFIG
}

export { getConfig }
