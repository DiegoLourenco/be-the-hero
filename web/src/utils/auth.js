export default function Auth() {
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  if (ongId && ongName) {
    return true;
  }
  return false;
}
