import Cliente from "./Cliente";
import Conta from "./Conta";
import NotificacaoSMS from "./NotificacaoSMS";
import NotificacaoEmail from "./NotificacaoEmail";
import NotificacaoApp from "./NotificacaoApp";
import ValorInvalidoError from "./ValorInvalidoError";
import ContaBloqueadaError from "./ContaBloqueadaError";
import SaldoInsuficienteError from "./SaldoInsuficienteError";
import LimiteDiarioExcedidoError from "./LimiteDiarioExcedidoError";

function tentarSacar(cliente: Cliente, conta: Conta, valor: number): void {
    console.log("\n--- " + cliente.getNome() + " tenta sacar R$ " + valor + " da conta " + conta.getNumero());
    try {
        conta.sacar(valor);
        console.log("Saque realizado! Saldo atual: R$ " + conta.consultarSaldo());
    } catch (erro) {
        if (erro instanceof ValorInvalidoError) {
            console.log("Erro de valor inválido: " + erro.message);
            cliente.notificar(erro.message);
        } else if (erro instanceof ContaBloqueadaError) {
            console.log("Erro de conta bloqueada: " + erro.message);
            cliente.notificar(erro.message);
        } else if (erro instanceof SaldoInsuficienteError) {
            console.log("Erro de saldo insuficiente: " + erro.message);
            cliente.notificar(erro.message);
        } else if (erro instanceof LimiteDiarioExcedidoError) {
            console.log("Erro de limite diário: " + erro.message);
            cliente.notificar(erro.message);
        }
    }
}

// Clientes (cada um com um canal de notificação diferente)
const ana = new Cliente("Ana", "111.111.111-11", "Rua das Flores, 10", 3000, new NotificacaoSMS());
const carlos = new Cliente("Carlos", "222.222.222-22", "Av. Central, 200", 4500, new NotificacaoEmail());
const bia = new Cliente("Bia", "333.333.333-33", "Rua do Sol, 55", 2800, new NotificacaoApp());

// Contas (um cliente pode ter uma ou mais contas)
const contaAna1 = new Conta(1001, 1, new Date(2020, 0, 15), 100, 300);
const contaAna2 = new Conta(1002, 1, new Date(2022, 5, 3), 2000, 300);
const contaCarlos1 = new Conta(2001, 1, new Date(2019, 2, 20), 80, 500);
const contaCarlos2 = new Conta(2002, 1, new Date(2021, 8, 9), 1000, 500);
const contaBia = new Conta(3001, 2, new Date(2023, 10, 1), 500, 100);

ana.adicionarConta(contaAna1);
ana.adicionarConta(contaAna2);
carlos.adicionarConta(contaCarlos1);
carlos.adicionarConta(contaCarlos2);
bia.adicionarConta(contaBia);

contaCarlos2.setBloqueada(true);

console.log("Ana tem " + ana.getContas().length + " contas.");
console.log("Carlos tem " + carlos.getContas().length + " contas.");

// Saques com sucesso
tentarSacar(ana, contaAna1, 30);
tentarSacar(bia, contaBia, 60);

// Valor inválido
tentarSacar(ana, contaAna1, -50);
tentarSacar(carlos, contaCarlos1, 0);
tentarSacar(bia, contaBia, -10);

// Conta bloqueada
tentarSacar(carlos, contaCarlos2, 100);
tentarSacar(carlos, contaCarlos2, 200);

// Saldo insuficiente
tentarSacar(carlos, contaCarlos1, 150);
tentarSacar(ana, contaAna1, 500);

// Limite diário excedido
tentarSacar(ana, contaAna2, 400);
tentarSacar(bia, contaBia, 60);

// Depósitos e consulta de saldo
contaAna1.depositar(200);
contaCarlos1.depositar(50);
console.log("\nSaldo da conta da Ana (1001): R$ " + contaAna1.consultarSaldo());
console.log("Saldo da conta do Carlos (2001): R$ " + contaCarlos1.consultarSaldo());
