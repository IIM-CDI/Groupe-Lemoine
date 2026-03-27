export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diff < 60) return "à l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heures`;
    if (diff < 2592000) return `il y a ${Math.floor(diff / 86400)} jours`;
    if (diff < 31536000) return `il y a ${Math.floor(diff / 2592000)} mois`;
  
    return `il y a ${Math.floor(diff / 31536000)} ans`;
}