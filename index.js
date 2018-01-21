const pth = require('path')
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

async function compress (arch, path, options = {}) {
  /**
   * Run tar create archive.
   */
  const opts = { type: 'gzip', level: 6 }
  options = { ...opts, ...options }

  const tar = `tar -cv -C "${pth.dirname(path)}" "${pth.basename(path)}"`
  const cmd = `${options.type} -${options.level}`

  try {
    const result = await execa.shell(`${tar} | ${cmd} > "${arch}"`)
    return result
  } catch (err) {
    throw err
  }
}

async function extract (arch, path = '', options = {}) {
  /**
   * Run tar extract.
   */
  const opts = { overwrite: true }
  options = { ...opts, ...options }
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
