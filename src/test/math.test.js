
test('Deve retornar 6', () => {
    expect(1 + 5).toBe(6)
});

test('async test', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done()
    }, 2000)
})

async function add(num1, num2) {
    return num1 + num2
}

test('soma entre numeros', async () => {
    const sum = await add(1, 3)
    expect(sum).toBe(4)
})
