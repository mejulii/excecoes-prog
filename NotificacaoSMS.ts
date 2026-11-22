import CanalNotificacao from "./CanalNotificacao";
import Cliente from "./Cliente";

export default class NotificacaoSMS implements CanalNotificacao {
    public enviar(mensagem: string, cliente: Cliente): void {
        console.log("[SMS para " + cliente.getNome() + "] " + mensagem);
    }
}
