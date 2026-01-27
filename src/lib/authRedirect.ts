// Centraliza a lógica de redirectTo usada em fluxos de auth (reset de senha, etc.)
// para evitar links quebrados em domínios que exigem login na plataforma.

export function getResetPasswordRedirectTo() {
  const host = window.location.hostname;
  const path = "/reset-password";

  // Public preview URL for this project (supports SPA routing).
  // Using the published URL can result in 404 on deep links depending on host config.
  const publicPreviewBase = "https://id-preview--dbd9d9ec-e919-4405-a689-4a0e15bfb60f.lovable.app";

  if (host.endsWith("lovableproject.com")) {
    return `${publicPreviewBase}${path}`;
  }

  return `${window.location.origin}${path}`;
}
