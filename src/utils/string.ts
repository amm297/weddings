export const formatAccountNumber = (account: string) => {
  return account.match(/.{1,4}/g)?.join(" ") || account;
};
