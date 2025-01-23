const checkFields = async (e: MouseEvent): Promise<string> => {
  if ((e.type) && ((e.type).toLowerCase() !== "click") || (
    (e.target as HTMLElement)
  )) { }
  return "Ok"
}
