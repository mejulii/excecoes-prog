import ValorInvalidoError from "./ValorInvalidoError";
import ContaBloqueadaError from "./ContaBloqueadaError";
import SaldoInsuficienteError from "./SaldoInsuficienteError";
import LimiteDiarioExcedidoError from "./LimiteDiarioExcedidoError";

export default class Conta {
    private numero: number;
    private agencia: number;
    private dataAbertura: Date;
    private saldo: number;
    private bloqueada: boolean;
    private limiteDiario: number;
    private sacadoHoje: number;

    constructor(numero: number, agencia: number, dataAbertura: Date, saldo: number, limiteDiario: number) {
        this.numero = numero;
        this.agencia = agencia;
        this.dataAbertura = dataAbertura;
        this.saldo = saldo;
        this.bloqueada = false;
        this.limiteDiario = limiteDiario;
        this.sacadoHoje = 0;
    }

    public sacar(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError(valor);
        }
        if (this.bloqueada) {
            throw new ContaBloqueadaError(this.numero);
        }
        if (valor > this.saldo) {
            throw new SaldoInsuficienteError(valor - this.saldo);
        }
        if (this.sacadoHoje + valor > this.limiteDiario) {
            throw new LimiteDiarioExcedidoError(this.limiteDiario);
        }
        this.saldo -= valor;
        this.sacadoHoje += valor;
    }

    public depositar(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError(valor);
        }
        this.saldo += valor;
    }

    public consultarSaldo(): number {
        return this.saldo;
    }

    public getNumero(): number {
        return this.numero;
    }

    public setNumero(numero: number): void {
        this.numero = numero;
    }

    public getAgencia(): number {
        return this.agencia;
    }

    public setAgencia(agencia: number): void {
        this.agencia = agencia;
    }

    public getDataAbertura(): Date {
        return this.dataAbertura;
    }

    public setDataAbertura(dataAbertura: Date): void {
        this.dataAbertura = dataAbertura;
    }

    public getBloqueada(): boolean {
        return this.bloqueada;
    }

    public setBloqueada(bloqueada: boolean): void {
        this.bloqueada = bloqueada;
    }

    public getLimiteDiario(): number {
        return this.limiteDiario;
    }

    public setLimiteDiario(limiteDiario: number): void {
        this.limiteDiario = limiteDiario;
    }

    public getSacadoHoje(): number {
        return this.sacadoHoje;
    }
}
