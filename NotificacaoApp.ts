import CanalNotificacao from "./CanalNotificacao";
import Cliente from "./Cliente";

export default class NotificacaoApp implements CanalNotificacao {
    public enviar(mensagem: string, cliente: Cliente): void {
        console.log("[Notificação no app para " + cliente.getNome() + " - imediata] " + mensagem);
    }
}
