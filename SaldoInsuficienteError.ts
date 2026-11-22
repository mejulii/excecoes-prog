export default class SaldoInsuficienteError extends Error {
    constructor(falta: number) {
        super("Saldo insuficiente. Faltam R$ " + falta + " para realizar o saque.");
    }
}
