import fs from 'fs'
import tar from '.'
import test from 'ava'

test('compress and decompress a file', async t => {
  const testFile = 'fixtures/a.txt'
  const testArch = 'a.tgz'

  const initialText = fs.readFileSync(testFile, 'utf8')
  await tar.compress(testArch, testFile)

  const files = await tar.list(testArch)
  t.deepEqual(files, ['a.txt'])

  await tar.extract(testArch)
  const finalText = fs.readFileSync(testFile, 'utf8')

  fs.unlinkSync('a.txt')
  fs.unlinkSync(testArch) // cleanup

  t.is(initialText, finalText)
})

test('compress and list a folder', async t => {
  const testPath = 'fixtures/'
  const testArch = 'fix.tgz'

  await tar.compress(testArch, testPath)
  const files = await tar.list(testArch)
  fs.unlinkSync(testArch) // cleanup

  t.deepEqual(files, [
    'fixtures/',
    'fixtures/a.txt',
    'fixtures/deep/',
    'fixtures/deep/b.txt',
    'fixtures/deep/deeper/',
    'fixtures/deep/deeper/c.txt'
  ])
})

test('compress levels', async t => {
  const testPath = 'fixtures/'
  const testArch = 'level.tgz'

  await tar.compress(testArch, testPath, { level: 1 })
  const s1 = fs.statSync(testArch).size
  await tar.compress(testArch, testPath, { level: 9 })
  const s9 = fs.statSync(testArch).size

  fs.unlinkSync(testArch) // cleanup

  t.true(s9 < s1)
})
