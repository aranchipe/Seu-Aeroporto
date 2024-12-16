export function formatPhoneNumber(phone: string | number | undefined): string {
    if (!phone) return ''; // Retorna vazio se o valor for indefinido

    // Remove caracteres não numéricos
    const cleaned = phone.toString().replace(/\D/g, '');

    // Aplica a máscara (XX) XXXXX-XXXX
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}
