export default class LimiteDiarioExcedidoError extends Error {
    constructor(limiteDiario: number) {
        super("Limite diário excedido. O limite de saques por dia é R$ " + limiteDiario + ".");
    }
}
