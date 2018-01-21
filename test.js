import fs from 'fs'
import tar from '.'
import test from 'ava'

test('compress and decompress a file', async t => {
  const testFile = 'fixtures/a.txt'
  const initialText = fs.readFileSync(testFile, 'utf8')
  await tar.tarCompress('a.tgz', testFile)
  await tar.tarExtract('a.tgz')
  const finalText = fs.readFileSync(testFile, 'utf8')
  t.is(initialText, finalText)
})
