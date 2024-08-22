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

test("Deve criar uma conta com CPF inválido -1", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "12312312312",
		isPassenger: true
	};
	const output = await signup(input);
	expect(output).toBe(-1)
});

test("Deve testar uma conta com e-mail inválido -2", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await signup(input);
	expect(output).toBe(-2)
});

test("Deve testar uma conta com nome inválido -3", async function () {
	const input = {
		name: "John",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await signup(input);
	expect(output).toBe(-3)
});

test("Deve não criar uma conta para o passageiro com o mesmo e-mail -4", async function () {
	const fixedEmail = `john.doe@gmail.com`;
	const firstInput = {
		name: "John Doe",
		email: fixedEmail,
		cpf: "87748248800",
		isPassenger: true
	};
	const firstOutput = await signup(firstInput);
	const secondInput = {
		name: "Michael Jackson",
		email: fixedEmail,
		cpf: "97456321558",
		isPassenger: true
	};
	const secondOutput = await signup(secondInput);
	expect(secondOutput).toBe(-4);
});

test("Deve não criar uma conta para o motorista com a placa do carro inválida -5", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "1234567"
	};
	const output = await signup(input);
	expect(output).toBe(-5);
});