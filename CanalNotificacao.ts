import Cliente from "./Cliente";

export default interface CanalNotificacao {
    enviar(mensagem: string, cliente: Cliente): void;
}
