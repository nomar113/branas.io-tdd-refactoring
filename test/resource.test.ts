import crypto from "crypto";
import { getAccountByEmail, getAccountById, saveAccount } from "../src/resources";

test("Deve salvar um registro na tabela account e consultar por id", async function () {
	const account = {
        accountId: crypto.randomUUID(),
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
    await saveAccount(account);
    const accountById = await getAccountById(account.accountId);
    expect(accountById.account_id).toBe(account.accountId);
    expect(accountById.name).toBe(account.name);
	expect(accountById.email).toBe(account.email);
	expect(accountById.cpf).toBe(account.cpf);
});

test("Deve salvar um registro na tabela account e consultar por e-mail", async function () {
	const account = {
        accountId: crypto.randomUUID(),
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
    await saveAccount(account);
    const accountByEmail = await getAccountByEmail(account.email);
    expect(accountByEmail.account_id).toBe(account.accountId);
    expect(accountByEmail.name).toBe(account.name);
	expect(accountByEmail.email).toBe(account.email);
	expect(accountByEmail.cpf).toBe(account.cpf);
});