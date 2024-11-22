import { http, delay, HttpResponse } from 'msw'
import { readFile } from 'fs/promises'
import path from 'path'

export const handlers = [
  http.get(
    '/blogs/2024/10/70e2c51a-f70f-4df5-9cb8-bc4b88260888.html',
    async () => {
      const filePath = path.resolve(
        __dirname,
        '../../public/blogs/2024/10/70e2c51a-f70f-4df5-9cb8-bc4b88260888.html'
      )

      // Read the file content asynchronously
      const fileContent = await readFile(filePath, 'utf-8')

      await delay(400)
      return HttpResponse.html(fileContent)
    }
  )
]
