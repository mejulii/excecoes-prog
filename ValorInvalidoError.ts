export default class ValorInvalidoError extends Error {
    constructor(valor: number) {
        super("Valor inválido: R$ " + valor + ". O valor precisa ser maior que zero.");
    }
}
