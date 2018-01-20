const execa = require('execa')

async function tarList (arch) {
  /**
   * Run tar list command.
   */
  try {
    const result = await execa('tar', ['-tf', arch])
    return result.stdout.split('\n')
  } catch (err) {
    throw err
  }
}

async function tarCompress (arch, path) {
  try {
    const result = await execa('tar', ['-cvzf', arch, path])
    return result
  } catch (err) {
    throw err
  }
}

async function tarExtract (arch, path = '') {
  try {
    const result = await execa('tar', ['-xvzf', arch, path])
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  tarList,
  tarCompress,
  tarExtract
}
