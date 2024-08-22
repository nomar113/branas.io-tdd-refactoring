import crypto from "crypto";
import { validate } from "./validateCpf";
import { getAccountByEmail, getAccountById, saveAccount } from "./resources";

export async function signup(input: any): Promise<any> {
	const account = input;
	account.accountId = crypto.randomUUID();
	const existingAccount = await getAccountByEmail(input.email);
	if (existingAccount) return -4;
	if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
	if (!input.email.match(/^(.+)@(.+)$/)) return -2;
	if (!validate(input.cpf)) return -1;	
	if (input.isDriver && input.carPlate && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) return -5;
	await saveAccount(account);
	return {
		accountId: account.accountId
	}
}

export async function getAccount(accountId: string) {
	const account = await getAccountById(accountId);
	return account;
};
