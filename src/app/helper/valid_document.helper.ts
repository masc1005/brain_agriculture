export function validateCPFOrCNPJ(value: string) {
  value = value.replace(/[^\d]+/g, "");

  if (value.length === 11) {
    return { tipo: "cpf", value };
  } else if (value.length === 14) {
    return { tipo: "cnpj", value };
  } else {
    return { tipo: "desconecido", valid: false };
  }
}
