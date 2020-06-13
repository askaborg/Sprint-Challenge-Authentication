const db = require("../database/dbConfig.js")
const Users = require("./user-model.js")

describe("user model", () => {
    describe("test environment", () => {
        test("using test environment?", () => {
            expect(process.env.DB_ENV).toBe("test")
        })
    })

    beforeEach(async () => {
        await db("users").truncate()
    })

    describe("add()", () => {
        test("adding user to db", async () => {
            await Users.add({ username: "HienLe", password: "password" })
            await Users.add({ username: "SarahLe", password: "password" })
            const users = await db("users")
            expect(users).toHaveLength(2)
        })
    })

    describe("findBy(username)", () => {
        test("find a user and return one item", async () => {
            const username = "HienLe"
            await Users.add({ username: "HienLe", password: "password" })
            await Users.findBy({ username })
            const users = await db("users")
            expect(users).toHaveLength(1) 
        })
    })
})