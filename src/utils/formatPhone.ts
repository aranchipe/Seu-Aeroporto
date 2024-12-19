export function formatPhoneNumber(phone: string | number | undefined): string {
  if (!phone) return '';

  const cleaned = phone.toString().replace(/\D/g, '');

  return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}