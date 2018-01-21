const execa = require('execa')

async function list (arch) {
  /**
   * Run tar list.
   */
  try {
    const result = await execa('tar', ['-tf', arch])
    return result.stdout.split('\n')
  } catch (err) {
    throw err
  }
}

async function compress (arch, path, options = { type: 'gzip', level: 6 }) {
  /**
   * Run tar create archive.
   */
  try {
    const result = await execa.shell(`tar -cvzf ${arch} ${path}`)
    return result
  } catch (err) {
    throw err
  }
}

async function extract (arch, path = '', options = { overwrite: true }) {
  /**
   * Run tar extract.
   */
  const over = options.overwrite ? '' : 'k'
  try {
    const result = await execa.shell(`tar -xvf${over} ${arch} ${path}`)
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  list,
  compress,
  extract
}
