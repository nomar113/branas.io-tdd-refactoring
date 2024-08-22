import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(200);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
	const outuptGetAccount = responseGetAccount.data;
	expect(outuptGetAccount.name).toBe(input.name);
	expect(outuptGetAccount.email).toBe(input.email);
	expect(outuptGetAccount.cpf).toBe(input.cpf);
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
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(200);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
	const outuptGetAccount = responseGetAccount.data;
	expect(outuptGetAccount.name).toBe(input.name);
	expect(outuptGetAccount.email).toBe(input.email);
	expect(outuptGetAccount.cpf).toBe(input.cpf);
	expect(outuptGetAccount.car_plate).toBe(input.carPlate);
});

test("Deve criar uma conta com CPF inválido -1", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "12312312312",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.data).toBe(-1)
});

test("Deve testar uma conta com e-mail inválido -2", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.data).toBe(-2)
});

test("Deve testar uma conta com nome inválido -3", async function () {
	const input = {
		name: "John",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.data).toBe(-3)
});

test("Deve não criar uma conta para o passageiro com o mesmo e-mail -4", async function () {
	const fixedEmail = `john.doe@gmail.com`;
	const input1 = {
		name: "John Doe",
		email: fixedEmail,
		cpf: "87748248800",
		isPassenger: true
	};
	const output1 = await axios.post("http://localhost:3000/signup", input1);
	const input2 = {
		name: "Michael Jackson",
		email: fixedEmail,
		cpf: "97456321558",
		isPassenger: true
	};
	const output2 = await axios.post("http://localhost:3000/signup", input2);
	expect(output2.data).toBe(-4);
});

test("Deve não criar uma conta para o motorista com a placa do carro inválida -5", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "1234567"
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.data).toBe(-5);
});