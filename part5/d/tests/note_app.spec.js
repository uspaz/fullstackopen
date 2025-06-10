const { test, expect } = require("@playwright/test")
const { describe } = require("node:test")

describe("Note app", () => {
    test("front page can be opened", async ({ page }) => {
        await page.goto("http://localhost:5173/")

        const locator = await page.getByText("Notas")
        await expect(locator).toBeVisible()
    })

    test("login form can be opened", async ({ page }) => {
        await page.goto("http://localhost:5173/")

        await page.getByRole("button", { name: "login" }).click()
        await page.getByRole("textbox").first().fill("root")
        await page.getByRole("textbox").last().fill("root")

        await page.getByRole("button", { name: "Iniciar sesión" }).click()

        await expect(page.getByText("Notas by Superuser")).toBeVisible()
    })

    // test("login form can be opened", async ({ page }) => {
    //     await page.goto("http://localhost:5173/")

    //     await page.getByRole("button", { name: "login" }).click()
    //     const textboxes = await page.getByRole("textbox").all()
    //     await textboxes[0].fill("root")
    //     await textboxes[1].fill("root")

    //     await page.getByRole("button", { name: "Iniciar sesión" }).click()

    //     await expect(page.getByText("Notas by Superuser")).toBeVisible()
    // })
})

