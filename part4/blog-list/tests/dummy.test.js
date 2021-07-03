const dummy = require('../utils/list_helper').dummy

test('dummy testing', () => {
    const result = dummy(1)

    expect(result).toBe(1)
})