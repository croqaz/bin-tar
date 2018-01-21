import fs from 'fs'
import tar from '.'
import test from 'ava'

test('compress and decompress a file', async t => {
  const testFile = 'fixtures/a.txt'
  const testArch = 'a.tgz'

  const initialText = fs.readFileSync(testFile, 'utf8')
  await tar.tarCompress(testArch, testFile)
  await tar.tarExtract(testArch)
  const finalText = fs.readFileSync(testFile, 'utf8')
  fs.unlinkSync(testArch) // cleanup

  t.is(initialText, finalText)
})

test('compress and list a folder', async t => {
  const testPath = 'fixtures/'
  const testArch = 'fix.tgz'

  await tar.tarCompress(testArch, testPath)
  const files = await tar.tarList(testArch)
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
