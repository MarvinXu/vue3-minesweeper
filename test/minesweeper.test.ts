import { describe, expect, it } from 'vitest'
import { createBoard } from '../src/composables/minesweeper'

describe('minesweeper.ts', () => {
  it('should create board', () => {
    const board = createBoard(5, 5)
    expect(board).toMatchInlineSnapshot(`
      [
        [
          {
            "id": 0,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 1,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 2,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 3,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 4,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
        ],
        [
          {
            "id": 5,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 6,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 7,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 8,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 9,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
        ],
        [
          {
            "id": 10,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 11,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 12,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 13,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 14,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
        ],
        [
          {
            "id": 15,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 16,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 17,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 18,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 19,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
        ],
        [
          {
            "id": 20,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 21,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 22,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 23,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
          {
            "id": 24,
            "isFlag": true,
            "isMine": false,
            "num": 0,
          },
        ],
      ]
    `)
  })
})
