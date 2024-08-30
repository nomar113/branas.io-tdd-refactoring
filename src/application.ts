import crypto from "crypto";
import { validate } from "./validateCpf";
import { getAccountByEmail, getAccountById, saveAccount } from "./resources";

export async function signup(input: any): Promise<any> {
	const account = input;
	account.accountId = crypto.randomUUID();
	const existingAccount = await getAccountByEmail(input.email);
	if (existingAccount) throw new Error("Account already exists");
	if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
	if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
	if (!validate(input.cpf)) throw new Error("Invalid cpf");	
	if (input.isDriver && input.carPlate && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate");
	await saveAccount(account);
	return {
		accountId: account.accountId
	}
}

export async function getAccount(accountId: string) {
	const account = await getAccountById(accountId);
	return account;
};
