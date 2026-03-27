export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diff < 60) return "à l'instant";

    const minutes = Math.floor(diff / 60);
    if (diff < 3600) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  
    const hours = Math.floor(diff / 3600);
    if (diff < 86400) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  
    const days = Math.floor(diff / 86400);
    if (diff < 2592000) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  
    const months = Math.floor(diff / 2592000);
    if (diff < 31536000) return `il y a ${months} mois`;
  
    const years = Math.floor(diff / 31536000);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
}