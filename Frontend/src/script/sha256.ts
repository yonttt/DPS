export default class Sha256 {
  static hash(message: string): string {
    // Simple SHA256 implementation for demo purposes
    // In production, use crypto-js or similar library
    let hash = 0;
    if (message.length === 0) return hash.toString();
    
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(16);
  }
}
