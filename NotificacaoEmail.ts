import CanalNotificacao from "./CanalNotificacao";
import Cliente from "./Cliente";

export default class NotificacaoEmail implements CanalNotificacao {
    public enviar(mensagem: string, cliente: Cliente): void {
        console.log("[E-mail para " + cliente.getNome() + "]");
        console.log("  Assunto: Aviso sobre a sua conta");
        console.log("  Olá, " + cliente.getNome() + "!");
        console.log("  " + mensagem);
        console.log("  Atenciosamente, Cooperativa de Crédito.");
    }
}
