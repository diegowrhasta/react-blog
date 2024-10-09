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
    _CONFIG.mockMode = import.meta.env.VITE_APP_MOCK_MODE === 'true'
    _CONFIG.initialized = true
  }

  return _CONFIG
}

export { getConfig }
