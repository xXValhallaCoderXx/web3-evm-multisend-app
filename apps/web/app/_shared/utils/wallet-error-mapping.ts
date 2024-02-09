export const walletError = (_error: any) => {
  if (_error) {
    switch (_error.code) {
      case -32002:
        return "Pending wallet request";
      default:
        return "Unknown error";
    }
  }
  return "Unknown error";
};
