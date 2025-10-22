import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET || "4rq2n3tqeenzeppnxny0y86f3tr86ig8";
const IV_LENGTH = 16;

if(!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    console.warn(`ENCRYPTION_KEY must be set and 32 characters long for AES-256-GCM encryption! Current Length: ${ENCRYPTION_KEY.length}`);
};

// Encrypt a string
export function encrypt(text: string): string {
   const iv = crypto.randomBytes(IV_LENGTH);
   const cipher = crypto.createCipheriv(
    "aes-256-gcm", Buffer.from(ENCRYPTION_KEY), iv
   );
   let encrypted = cipher.update(text, "utf-8", "hex");
   encrypted += cipher.final("hex");
   const authTag = cipher.getAuthTag().toString("hex");
   return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

// Decrypt a string
export function decrypt(encryptedText: string): string {
    const [ivHex, encrypted, authTagHex] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-gcm", Buffer.from(ENCRYPTION_KEY), iv
    );
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}