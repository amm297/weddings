export const formatAccountNumber = (account: string) => {
  return account.match(/.{1,4}/g)?.join(" ") || account;
};


export const fromCamelCaseToWords = (text: string ) => {
  return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
}