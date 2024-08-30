import { getAccount, signup } from "../src/application";

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const responseSignup = await signup(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount(responseSignup.accountId);
	expect(responseGetAccount.name).toBe(input.name);
	expect(responseGetAccount.email).toBe(input.email);
	expect(responseGetAccount.cpf).toBe(input.cpf);
});

test("Deve criar uma conta para um motorista", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: false,
		isDriver: true,
		carPlate: "UAI9090"
	};
	const responseSignup = await signup(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount(responseSignup.accountId);
	expect(responseGetAccount.name).toBe(input.name);
	expect(responseGetAccount.email).toBe(input.email);
	expect(responseGetAccount.cpf).toBe(input.cpf);
	expect(responseGetAccount.car_plate).toBe(input.carPlate);
});

test("Deve criar uma conta com CPF inválido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "12312312312",
		isPassenger: true
	};
	await expect(() => signup(input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Deve testar uma conta com e-mail inválido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	await expect(() => signup(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Deve testar uma conta com nome inválido", async function () {
	const input = {
		name: "John",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	await expect(() => signup(input)).rejects.toThrow(new Error("Invalid name"));
});

test("Deve não criar uma conta para o passageiro com o mesmo e-mail", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "AAA4567"
	};
	await signup(input);
	await expect(() => signup(input)).rejects.toThrow(new Error("Account already exists"));
});

test("Deve não criar uma conta para o motorista com a placa do carro inválida", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "1234567"
	};
	await expect(() => signup(input)).rejects.toThrow(new Error("Invalid car plate"));
});