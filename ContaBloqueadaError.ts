export default class ContaBloqueadaError extends Error {
    constructor(numeroConta: number) {
        super("A conta " + numeroConta + " está bloqueada. Procure a cooperativa para saber o motivo.");
    }
}
